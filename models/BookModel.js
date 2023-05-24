// 导入 mongoose
const mongoose = require('mongoose');

// 创建文档的结果对象
// 设置集合中文档的属性和属性值类型
let BookSchema = new mongoose.Schema({
    name: String,
    auther: String,
    price: Number
});

// 创建模型对象  对文档操作的封装对象
let BookModel = mongoose.model('books', BookSchema);   //集合名称   操作对象

// 暴露模型对象
module.exports = BookModel;