"use strict";

var express = require('express');

var router = express.Router();

var myFunction = require('./myFunction');

var postList = [];

var getDataArr = require('./newsData.js'); // 用于连接数据库进行增删改查


var mysql = require('mysql'); // const {
//     JSON
// } = require('mysql/lib/protocol/constants/types');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'community'
});
connection.connect(); // 渲染首页

router.get('/', function (req, res) {
  // console.log(req.session.user);
  res.render('index.html', {
    user: req.session.user,
    list: postList,
    news: getDataArr()
  });
}); // 渲染登录页

router.get('/login', function (req, res) {
  res.render('login.html');
}); //处理登陆数据

router.post('/login', function (req, res) {
  var reqEmail = req.body.email;
  var reqPassword = req.body.password; // 从数据库查找，验证账号密码

  connection.query("SELECT * FROM user WHERE email = \"".concat(reqEmail, "\" and password = \"").concat(reqPassword, "\""), function (error, result) {
    console.log(result); //        [
    //   RowDataPacket {
    //     id: 1,
    //     email: '1174234009@qq.com',
    //     nickname: '天宗南北',
    //     password: '123456',
    //     photo: '',
    //     gender: 2,
    //     age: null,
    //     points: 0,
    //     power: 0
    //   }
    // ]

    if (error) {
      return next(err);
    } // 如果结果的数组里面毛都没有则不允许登录


    if (result.length === 0) {
      res.status(200).json({
        errCode: 1,
        message: 'Email password is incorrect'
      });
    } else {
      // 登陆成功
      req.session.user = result[0].nickname;
      res.status(200).json({
        errCode: 0,
        message: 'land successfully'
      });
    }
  });
}); // 渲染注册页

router.get('/register', function (req, res) {
  res.render('register.html');
}); // 注册新用户提交给数据库

router.post('/register', function (req, res, next) {
  console.log(req.body);
  var reqEmail = req.body.email;
  var reqNickname = req.body.nickname;
  var reqPassword = req.body.password; // 查询数据库中是否有已存在的邮箱

  connection.query("SELECT * FROM user WHERE email = \"".concat(reqEmail, "\""), function (error, result) {
    // console.log('查询结果', result);
    if (error) {
      // console.log('错误了');
      return next(err);
    } //结果是个数组，长度大于0就会提示邮箱已被注册


    if (result.length > 0) {
      res.status(200).json({
        errCode: 1,
        message: 'Email is already exist'
      });
    } else {
      // 插入数据库
      // console.log('准备插入数据库');
      connection.query("INSERT INTO user(id,email,nickname,password) VALUES(null,\"".concat(reqEmail, "\",\"").concat(reqNickname, "\",\"").concat(reqPassword, "\")"), function (error) {
        // console.log('注册成功');
        req.session.user = reqNickname;

        if (error) {
          return next(error);
        }

        res.status(200).json({
          errCode: 0,
          message: 'registered successfully'
        });
      });
    }
  });
}); // 处理退出登陆
// router.get('/quit', function (req, res) {
//     // 清除登陆状态
//     req.session.user = null
//     // 重定向到登录页
//     res.redirect('/login')
// })
// 渲染发帖页面

router.get('/post', function (req, res) {
  if (!req.session.user) {
    res.render('postWarn.html');
  } else {
    res.render('post.html');
  }
}); // 记录用户的发帖信息，渲染内容到页面中

router.post('/post', function (req, res) {
  var message = req.body;
  message.postTime = myFunction.getTime();
  message.poster = req.session.user;
  postList.unshift(message);
  console.log(postList);
  res.redirect('/'); // console.log(postList);
}); // 处理退出登陆

router.get('/quit', function (req, res) {
  // 清除登陆状态
  req.session.user = null; // 重定向到登录页

  res.redirect('/login');
}); // 渲染积分商城

router.get('/shop', function (req, res) {
  res.render('shop.html');
});
module.exports = router;