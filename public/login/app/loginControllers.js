/**
 * Created by Administrator on 2015/10/26.
 * express login controller
 */
var userModel = require('../../../app/models/userModel');
var User = require('../../../app/models/user.model');
var crypto = require('crypto');//密码加密专用
var jwt = require('jsonwebtoken');//token加密专用
var logger = require('../../util/logHelper').helper;

exports.login = function(req, res){
    var userInfo = {
        id : req.body.user.id
    }
    var user = new User(userInfo);
    user.checkLogin(function(err, result){
        if(result.length != 0) {
            if (result[0].pwd == crypto.createHash('sha1').update(req.body.user.password).digest("base64")) {
                var user = {
                    name: result[0].name,
                    id: result[0].id,
                    levels:result[0].levels
                };
                res.cookie('user',JSON.stringify(user),{ maxAge: 10*60*1000 });
                req.session.user = user;
                var token = jwt.sign(user, 'YOUR_SECRET_STRING',{ expiresIn: 60*60 });
                logger.writeDebug(user.name + " come in !!")
                return res.send({
                    token: token,
                    user: user
                });
            } else {
                return res.sendStatus(401);
            }
        }else{
            return res.sendStatus(401);
        }
    });
}

exports.logout = function(req, res){
    delete  req.session.user;
    res.clearCookie('user', { path: '/' });
    res.redirect('/');
}