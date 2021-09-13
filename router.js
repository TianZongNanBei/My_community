const express = require('express');
const router = express.Router();
const myFunction = require('./myFunction');
const postList = [];

// 用于连接数据库进行增删改查
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'community'
});
connection.connect();

// 渲染首页
router.get('/', (req, res) => {
    // console.log(req.session.user);
    res.render('index.html', {
        user: req.session.user,
        list: postList
    });
})

// 渲染登录页
router.get('/login', (req, res) => {
    res.render('login.html');
})

//处理登陆数据
router.post('/login', (req, res) => {
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    // 从数据库查找，验证账号密码
    connection.query(`SELECT * FROM user WHERE email = "${reqEmail}" and password = "${reqPassword}"`, function (error, result) {
        console.log(result);
        //     [
        //     RowDataPacket {
        //         id: 1,
        //         email: '1174234009@qq.com',
        //         nickname: '天宗南北',
        //         password: '123456'
        //     }
        // ] 
        if (error) {
            return next(err);
        }

        // 如果结果的数组里面毛都没有则不允许登录
        if (result.length === 0) {
            res.status(200).json({
                errCode: 1,
                message: 'Email password is incorrect'
            })
        } else {
            // 登陆成功
            req.session.user = result[0].nickname;
            res.status(200).json({
                errCode: 0,
                message: 'land successfully'
            })
        }
    })

})

// 渲染注册页
router.get('/register', (req, res) => {
    res.render('register.html');
})

// 注册新用户提交给数据库
router.post('/register', (req, res, next) => {
    // console.log(req.body);
    const reqEmail = req.body.email;
    const reqNickname = req.body.nickname;
    const reqPassword = req.body.password;

    // 查询数据库中是否有已存在的邮箱
    connection.query(`SELECT * FROM user WHERE email = "${reqEmail}"`, function (error, result) {
        // console.log(result);
        if (error) {
            return next(err);
        }

        //结果是个数组，长度大于0就会提示邮箱已被注册
        if (result.length > 0) {
            res.status(200).json({
                errCode: 1,
                message: 'Email is already exist'
            })
        } else {
            // 插入数据库
            connection.query(`INSERT INTO user VALUES(null,"${reqEmail}","${reqNickname}","${reqPassword}")`, function (error) {

                req.session.user = reqNickname;

                if (error) {
                    return next(error);
                }
                res.status(200).json({
                    errCode: 0,
                    message: 'registered successfully'
                })
            });
        }
    });
})

// 处理退出登陆
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

})

// 记录用户的发帖信息，渲染内容到页面中
router.post('/post', function (req, res) {
    const message = req.body;
    message.postTime = myFunction.getTime();
    message.poster = req.session.user;
    postList.unshift(message);
    console.log(postList);
    res.redirect('/');
    // console.log(postList);
})

// 处理退出登陆
router.get('/quit', function (req, res) {
    // 清除登陆状态
    req.session.user = null

    // 重定向到登录页
    res.redirect('/login')
})










module.exports = router;