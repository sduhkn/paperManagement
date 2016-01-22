/**
 * Created by Administrator on 2015/10/26.
 * express login controller
 */
var userModel = require('../../../app/models/userModel');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');//token加密专用

exports.login = function(req, res){
    userModel.checkLogin(req,res,function(err, result){
        if(result.length != 0) {
            if (result[0].password == crypto.createHash('sha1').update(req.body.user.password).digest("base64")) {
                var user = {
                    name: result[0].sname,
                    id: result[0].sid
                };
                res.cookie('user',JSON.stringify(user),{ maxAge: 10*60*1000 });
                req.session.user = user;
                var token = jwt.sign(user, 'YOUR_SECRET_STRING',{ expiresIn: 60*60 });
                return res.send({
                    token: token,
                    user: result[0],
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
    req.session.user = null;
    res.cookie('userID',null);
    res.redirect('/');
}