const express = require('express');
const bodyParser = require('body-parser'); // post 数据是需要
const router = express.Router();
const app = express();

const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');
const jwt = require('jsonwebtoken');  //用来生成token
//文件模块 同步读取
const fs = require("fs");
const path = require('path')
const multer = require('multer');
app.use(express.static(__dirname + "/uploads/"));

app.use(bodyParser.json({limit: '2100000kb'}));
app.use(express.json({limit: '2100000kb'}));//解决图片上传文件大小限制413
app.use(bodyParser.urlencoded({limit: '2100000kb', extended: true}));


const pool = mysql.createPool({//创建连接池
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  multipleStatements: true    // 多语句查询
});

function CheckConnection (config) {//创立链接以及生成token的封装
        const me = this;
        pool.getConnection((err, conn) => {
            if (err) {
                throw err;
            } else {
                conn.query(config.sql, config.params, (err, result) => {
                    if (config.success) {
                        config.success(result);
                    }
                    if (config.error) {
                        config.error(err)
                    }
                    // 释放连接到连接池
                    conn.release();
                });
            }
        });
    }

router.get('/articleList', (req, res, next) => {
  let pageNum = req.body.pageNum, pageSize = req.body.pageSize;
    CheckConnection({
      sql:sqlMap.articleList,
      params:[pageNum, pageSize],
      success:(result) => {
        res.json({data:result,message:"ok", code:200});
        //console.log(res.json());
      },
      // error:(err)=>{
      //   res.json({code:11, message:"查不到文章！", affextedRows: 0});
      // }
    })
})


//个人中心
router.get('/other', (req, res, next) => {
  //console.log(req);
  let uid=req.query.uid;
  let token= req.headers.token || req.query.token || req.body.token;
  CheckConnection({
    sql:sqlMap.personnal,
    params:[uid,token],
    success:(result)=>{res.json({data:result,msg:"ok"});}});
});
//新增和编辑
router.post('/admin/edit',(req, res, next) => {
  let token = req.headers.token || req.query.token || req.body.token;
  let paramsInfo = [
      req.body.uid,
      req.body.article_title,
      req.body.article_content,
      req.body.article_date,
      req.body.article_html,
      req.body.article_tag,
      req.body.article_type,
      req.body.article_brief
      ]

      //console.log(paramsInfo);
      CheckConnection({
        sql:sqlMap.article_update,
        params:paramsInfo,
        success:(result)=>{
		   // console.log(result + "22222");
        res.json({data:result, message:"ok", code:200,});

		  }});

})
//文章具体详情页
router.get('/articleDetail', (req, res, next) => {
          // res.setHeader('Expires',0);
          // res.setHeader('CacheControl','no-cache')
  //console.log(req.body.article_id);
  let article_id = req.query.article_id
  let token = req.headers.token || req.query.token || req.body.token;
  CheckConnection({
    sql:sqlMap.article_detail,
    params:[article_id],
    success:(result)=>{res.json({data:result,msg:"ok",code:200,});}});
});
//文章更新
router.post('/updateArticleDetail', (req, res, next) => {
          // res.setHeader('Expires',0);
          // res.setHeader('CacheControl','no-cache')
  //console.log(req.body.article_id);
   let article_id = req.body.article_id,
   article_content=req.body.article_content,
   article_html=req.body.article_html;

  CheckConnection({
    sql:sqlMap.updateArticle,
    params:[article_content,article_html,article_id],
    success:(result)=>{res.json({data:result,msg:"ok",code:200,})}});
});


//图片上传
// 设置缓存路径和文件过滤器（4.3）参考（https://www.cnblogs.com/whuls/p/9368852.html）
var upload = multer({ dest: './uploads/'});
router.post('/image_upload', upload.array('image',12), function (req, res,next) {
  //console.log("wwwwwww" +req.files[0]);
    // 文件信息
    //console.log("文件"+req.files[0])
   // let resData=JSON.stringify(req.files[0]);
    if(!req.files[0]){
        //console.log("111111111"+req.error);
        res.send(req.error);
        return;
    }else{
      //res.send(JSON.stringify(req.files[0]));
        // console.log("2222222222222"+JSON.stringify(req.files[0]));
        // console.log(req.files[0].path + "路径");
        //next()
    }

    // 存储并响应客户端
    var des_file = __dirname + "/uploads/" + req.files[0].fieldname + "/" + req.files[0].originalname;
    console.log(des_file.split(":")[1] +"存储地址");
    fs.readFile(req.files[0].path, function (err, data) {
          console.log(req.files[0]);
        fs.writeFile(des_file, data, function (err) {
            if(err){
                //console.log(err);
            }else{
                var response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname,
                    //url:des_file.split(path.sep).join('/').split(":")[1],
                    url:req.files[0].originalname,

                };
                //console.log(response+"反应");
                //next();
                 res.json({data:response,message:"上传成功！",code:200,});
                 //next();

            }
        });
    });
})







module.exports = router;
