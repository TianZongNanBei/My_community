"use strict";

var express = require('express');

var fs = require('fs');

var path = require('path');

var router = require('./router');

var app = express(); // 配置模板引擎

app.engine('html', require('express-art-template'));
app.use('/public/', express["static"](path.join(__dirname, './public/')));
app.use('/node_modules/', express["static"](path.join(__dirname, './node_modules/')));
app.use(router);
app.listen(8000, function () {
  console.log('服务器启动成功！请通过 http://10.3.134.5:8000 进行访问');
});