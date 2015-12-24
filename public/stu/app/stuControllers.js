/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');
var User = require('../../../app/models/user.model');
var crypto = require('crypto');
var client = require('../../../config/DB/DBConnect');

exports.getStuOwnInfo = function (req, res) {
    userModel.showStuOwnInfoQueryByID(res, req.user.id, function (err, result, result1,result2) {
        if (result.length != 0) {
            return res.send({
                stu: result[0],
                stype: result1,
                teaInfo:result2
            });
        }
        else
            return res.sendStatus(401);
    })
    ;
}
exports.updateStuInfo = function (req, res) {
    userModel.updateStuInfo(req, res, req.user.id, function (err) {
        if (err) {
            return res.send({msg: "未知错误"});
        }
        else
            return res.send({msg: "修改成功"});
    })
}
exports.changePassword = function (req, res) {
    userModel.comparePassword(req, res, req.user.id, function (err, result) {
        if (result[0].password != crypto.createHash('sha1').update(req.body.pwd.old).digest("base64")) {
            return res.send({msg: "原密码不正确"});
        }
        else {
            userModel.changePassword(req, res, req.user.id, function (err) {
                if (err) {
                    return res.send({msg: "未知错误"});
                }
                else
                    return res.send({msg: "修改成功"});
            })
        }
    })
}

