const express = require('express');
const fs = require('fs');
const path = require('path');
const router = require('./router');
const session = require('express-session');

const app = express();
// 配置模板引擎
app.engine('html', require('express-art-template'));

// 配置bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// 放出静态资源
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

// 配置session
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false
}))

// 挂载路由
app.use(router);

//  404 
app.use(function (req, res) {
    res.render('404.html')
})

// 全局错误处理
app.use(function (err, req, res, next) {
    res.status(500).json({
        errCode: 500,
        message: err.message
    })
})


app.listen(8000, () => {
    console.log('服务器启动成功！请通过 http://10.3.134.5:8000 进行访问');
})