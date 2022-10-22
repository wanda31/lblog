const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');

const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');
const jwt = require('jsonwebtoken'); //用来生成token
const app = express();


const pool = mysql.createPool({ //创建连接池
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  multipleStatements: true // 多语句查询
});

app.use(bodyParser.json({
  limit: '2100000kb'
}));
app.use(express.json({
  limit: '2100000kb'
})); //解决图片上传文件大小限制413
app.use(bodyParser.urlencoded({
  limit: '2100000kb',
  extended: true
}));
// //设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1');
//   res.header("Cache-Control", 'no-store')
//   //res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
//用户登录时，生成token
app.get('/api/admin/login', (req, res, next) => {
  let uname = req.query.uname,
    upwd = req.query.upwd;
  pool.getConnection((err, connection) => {
    let sql = sqlMap.login;
    connection.query(sql, [uname, upwd], (err, result) => {
      let content = {name: req.query.name}; // 要生成token的主题信息
      let secretOrPrivateKey = "user_pass_xxx"; // 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 *60// 一周过期
      });
      console.log(result)
      res.json({data: result,message: "ok",token: token,code:200}); //是以json对象的形式返回去，还有以下方法:res.send以页面的方式返回去,res.download以文件的方式返回去，前端请求会下载此文件
      connection.release();
    })
  })

});
//app.disable('etag');

// // 全局的路由匹配
app.use((req, res, next) => {
  // 排除登陆注册页面
  console.log(req.url + "地址")
  var reg=/^\/api\/admin\/[a-z0-9]/;//正则匹配个人中心页面路径
  //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8

  //在个人中心页面部分（同时排除登陆页面）以及图片上传接口验证token
  if ( req.url == '/api/image_upload' || (reg.test(req.url) && req.url !== '/api/admin/login')) {
    // 不同形式获取token值
    let token = req.headers.token || req.query.token || req.body.token;
    console.log("aaa----------" +token)
    // 如果存在token ---- 验证
    if (token) {
      jwt.verify(token, 'user_pass_xxx', function(err, decoded) {
        if (err) {
          res.send({
            code: 10404,
            message: 'token已过期，请重新登录！'
          });

        } else {
          req.decoded = decoded;
          console.log('验证成功', decoded);

          next();
          return;
        }
      })
    } else { // 不存在 - 告诉用户---意味着未登录
      res.send({
        code: 10119,
        message: '没有找到token.'
      });
      return;
      //next(); //未登录,继续执行下一步请求
    }
  } else {
    next()
  }
})
// 后端api路由
app.use('/api', routerApi);


// 监听端口
console.log(process.platform);
const port = process.env.PORT || 3000;//利用process全局对象，在生产环境中读取process进程中的环境变量
app.listen(port,console.log('success listen at port:'+port));


function Result({
  code = 1,
  msg = "",
  token = "",
  data = {}
}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
  this.token = token;
}
