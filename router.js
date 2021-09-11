const express = require('express');
const router = express.Router();

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
    res.render('index.html');
})

// 渲染登录页
router.get('/login', (req, res) => {
    res.render('login.html');
})

//处理登陆数据
router.post('/login', (req, res) => {
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    // 验证账号密码
    connection.query(`SELECT * FROM user WHERE email = "${reqEmail}" and password = "${reqPassword}"`, function (error, results) {
        // console.log(results);
        if (error) {
            return next(err);
        }

        // 如果结果的数组里面毛都没有则不允许登录
        if (results.length === 0) {
            res.status(200).json({
                errCode: 1,
                message: 'Email password is incorrect'
            })
        } else {

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
    connection.query(`SELECT * FROM user WHERE email = "${reqEmail}"`, function (error, results) {
        // console.log(results);
        if (error) {
            return next(err);
        }

        //结果是个数组，长度大于0就会提示邮箱已被注册
        if (results.length > 0) {
            res.status(200).json({
                errCode: 1,
                message: 'Email is already exist'
            })
        } else {
            // 插入数据库
            connection.query(`INSERT INTO user VALUES(null,"${reqEmail}","${reqNickname}","${reqPassword}")`, function (error, results) {
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
















module.exports = router;