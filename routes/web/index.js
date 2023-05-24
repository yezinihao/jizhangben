// 导入 express
const express = require('express');
// 导入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
// 导入中间件检查登录
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

// 创建路由对象
const router = express.Router();


// 添加首页的路由规则
router.get('/', (req, res) => {
  // 重定向 /account
  res.redirect('/account');
})


// 记账本列表
router.get('/account', checkLoginMiddleware , function(req, res, next) {
  // 获取所有账单信息
  // let accounts = db.get('accounts').value();
  // 读取集合信息
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if(err){
      res.status(500).send('读取失败');
      return;
    }
    console.log(data);
    // 响应成功的提示
    res.render('list', {accounts: data, moment: moment});
  })
  
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', checkLoginMiddleware , (req, res) => {
  // 查看表单数据    2023-05-16 => new Date()
  // 使用工具包  2023-05-16 => moment => new Date()
  // console.log(req.body);
  // 修改 time 属性的值
  req.body.time = moment(req.body.time).toDate()
  // 插入数据库
  AccountModel.create({
    ...req.body,
  }, (err,data) => {
    if(err){
      res.status(500).send('插入失败');
      return;
    }
    // 成功提醒
    res.render('success', {msg: '添加成功哦~~~', url: '/account'});
  })
  // // 生成 id
  // let id = shortid.generate();
  // // 写入文件
  // db.get('accounts').unshift({id:id,...req.body}).write();
  
})

// 删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id;
  // 删除
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err){
      res.status(500).send('删除失败');
      return;
    }
    // 提醒
    res.render('success', {msg: '删除成功', url: '/account'});
  })
  

})
module.exports = router;
