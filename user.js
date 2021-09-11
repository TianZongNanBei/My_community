// 用于连接数据库进行增删改查
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'community'
});

connection.connect();

connection.query('INSERT INTO user(id,email,nickname,password) VALUES(null,"1174234009@qq.com","天宗南北",123456)', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});