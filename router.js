const express = require('express');
const router = express.Router();

// 渲染首页
router.get('/', (req, res) => {
    res.render('index.html');
})

// 渲染登录页
router.get('/login', (req, res) => {
    res.render('login.html');
})














module.exports = router;