"use strict";

var express = require('express');

var router = express.Router(); // 渲染首页

router.get('/', function (req, res) {
  res.render('index.html');
}); // 渲染登录页

router.get('/login', function (req, res) {
  res.render('login.html');
});
module.exports = router;