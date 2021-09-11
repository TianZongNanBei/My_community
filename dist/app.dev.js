"use strict";

var express = require('express');

var fs = require('fs');

var path = require('path');

var router = require('./router');

var app = express(); // 配置模板引擎

app.engine('html', require('express-art-template')); // 配置bodyParser

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // 放出静态资源

app.use('/public/', express["static"](path.join(__dirname, './public/')));
app.use('/node_modules/', express["static"](path.join(__dirname, './node_modules/'))); // 挂载路由

app.use(router); //  404 

app.use(function (req, res) {
  res.render('404.html');
}); // 全局错误处理

app.use(function (err, req, res, next) {
  res.status(500).json({
    errCode: 500,
    message: err.message
  });
});
app.listen(8000, function () {
  console.log('服务器启动成功！请通过 http://10.3.134.5:8000 进行访问');
});