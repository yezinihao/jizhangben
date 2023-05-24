/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error  数据库连接失败的回调
 */

module.exports = function (success, error) {
    // 判断 error 为其设置默认值
    if(typeof error !== 'function'){
        error = () => {
            console.log('连接失败');
        }
    }
    // 1、安装 mongoose
    // 2、导入 mongoose
    const mongoose = require('mongoose');
    // 导入配置文件
    const {DBHOST,DBPOST,DBNAME} = require('../config/config.js')

    // 设置 strictQuery 为 True
    mongoose.set('strictQuery', true);


    // 3、连接 mongodb 服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPOST}/${DBNAME}`,{useNewUrlParser: true, useUnifiedTopology: true});   //DBNAME 数据库名称

    // 4、设置回调
    // 设置连接成功时回调  once 一次   事件回调函数只执行一次
    mongoose.connection.once('open', () => {
        success();
    });

    // 设置连接错误时回调
    mongoose.connection.once('error', () => {
        error();
    })
    // 设置连接关闭时回调
    mongoose.connection.once('close', () => {
        console.log('连接关闭');
    })

    // 关闭 mongoose 的连接
    // setTimeout(() => {
    //     mongoose.disconnect();
    // },2000)

}