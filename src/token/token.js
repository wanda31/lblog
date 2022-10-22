//const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');
const jwt = require('jsonwebtoken');  //用来生成token
const app = express();




// 全局的路由匹配
app.use((req, res, next) => {
 // 排除登陆注册页面
   console.log(req);
  // console.log(res);
  if (req.url !== '/login' ) {
  // 不同形式获取token值
    let token = req.token || req.headers.token || req.query.token || req.body.token;
    console.log("aaa----------" +token)
    // 如果存在token ---- 验证
    if (token) {
      //console.log(token);
      jwt.verify(token, 'user_pass_xxx', function(err, decoded) {
        if (err) {
          res.send({
            code: '10119',
            message: '没有找到token.'
          });
        } else {
          req.decoded = decoded;
          console.log('验证成功', decoded);
          next()
        }
      })
    } else { // 不存在 - 告诉用户---意味着未登录
      res.send({
        code: '10119',
        message: '没有找到token.'
      });
    }
  } else {
    next()
  }
})

module.exports =app;
