// 导入 mongoose
const mongoose = require('mongoose');


// 创建文档的结果对象
// 设置集合中文档的属性和属性值类型
let UserSchema = new mongoose.Schema({
    // 标题
    username: String,
    password: String
});

// 创建模型对象  对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);   //集合名称   操作对象

// 暴露模型对象
module.exports = UserModel;