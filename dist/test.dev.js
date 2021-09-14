"use strict";

var fs = require('fs'); // 第一个参数  文件路径
// 第二个参数  文件内容
// 第三个参数  回调函数
// fs.writeFile('./你好.md', '大家好！我是你爹！', function (err) {
//     err ? console.log('文件写入失败！') : console.log('文件写入成功！');
// })
// 用于连接数据库进行增删改查


var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'community'
});
connection.connect();
connection.query('SELECT * FROM goods', function (error, results, fields) {
  if (error) throw error;
  fs.writeFile('./goodsData.json', JSON.stringify(results), function (err) {
    err ? console.log('文件写入失败！') : console.log('文件写入成功！');
  });
});