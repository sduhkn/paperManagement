/**
 * Created by Administrator on 2015/12/8.
 */
var userCtrl = require('./userManagement.controller');

module.exports = function(app){
    app.get('/user/queryUserInfoByNameOrID',userCtrl.queryUserInfoByNameOrID);
    app.get('/allUser',userCtrl.getAllUser);
}