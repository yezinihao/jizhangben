var express = require('express');
var router = express.Router();
// 导入用户的模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
// 读取配置项
const {secret} = require('../../config/config');    //读取密钥

// 登录操作
router.post('/login', (req,res) => {
    // 获取用户名和密码
    let {username, password} = req.body;
    // 查询数据库
    UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
        if(err){
            res.json({
                code: '2001',
                msg: '数据库读取失败',
                data: null
            })
            return;
        }
        // 判断 data
        if(!data){
            return res.json({
                code: '2002',
                msg: '用户名或密码错误',
                data: null
            })
        }
        
        // 创建当前用户的 token
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        })
        // 响应token
        res.json({
            code: '0000',
            msg: '响应成功',
            data: token
        })
    })
});

// 退出登录
router.post('/logout', (req, res) => {
    // 销毁 session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'});
    })
});

module.exports = router;
