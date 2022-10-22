const mysql = require('mysql');


const mysqlConfig = {
  host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
  user: 'root',
  password: '123456', // root 密码
  database: 'myblog', // 数据库名
  port: '3306'
}


module.exports = mysqlConfig;
