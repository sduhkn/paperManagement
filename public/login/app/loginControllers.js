/**
 * Created by Administrator on 2015/10/26.
 * express login controller
 */
var userModel = require('../../../app/models/userModel');
var crypto = require('crypto');

exports.login = function(req, res){
    var message;
    userModel.checkLogin(req,res,function(err, result){
        if(result.length != 0) {
            if (result[0].password == crypto.createHash('sha1').update(req.body.user.password).digest("base64")) {
                res.cookie('userID',result[0].sid,{ maxAge: 10*60*1000 });
                req.session.user = result;
                res.send({
                    state: 1
                });
            } else {
                message = '用户名密码错误';
                //状态为1返回成功，0密码错误，-1查询db失败
                res.send({
                    errMsg: message, state: 0,
                });
            }
        }else{
            message = '用户名密码错误';
            res.send({
                errMsg: message, state: -1,
            });
        }
    });
}

exports.logout = function(req, res){
    req.session.user = null;
    res.cookie('userID',null);
    res.redirect('/');
}