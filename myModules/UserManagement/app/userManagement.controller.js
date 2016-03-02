/**
 * Created by Administrator on 2015/12/8.
 */
var User = require('../../../app/models/user.model');
exports.queryUserInfoByNameOrID = function(req, res) {
    var jsonUser = JSON.parse(req.query.users);
    var user = new User(jsonUser);

    user.queryUserInfoByNameOrID(function(err, result){
        if(err){
            return res.sendStatus(500);//服务器出错
        }else {
            return res.json({userList: result});
        }
    })
}

exports.getAllUser = function(req, res){
    var user = new User();
    user.getAllUser(function(err, result){
        if(err){
            return res.sendStatus(500);//服务器出错
        }else {
            return res.json({userInfo: result});
        }
    })
}