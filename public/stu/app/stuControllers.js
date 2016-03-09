/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');
var User = require('../../../app/models/user.model');
var crypto = require('crypto');
var client = require('../../../config/DB/DBConnect');
//var client = require('../../../config/DB/DBConnect');

exports.getStuOwnInfo = function (req, res) {
    var userInfo = {
        id: req.session.user.id
    }
    var user = new User(userInfo);
    user.showStuOwnInfoQueryByID(function (err, result) {
        if (result.length != 0) {
            return res.send({
                stu: result[0]
            });
        }
        else
            return res.send(401);
    })
    ;
}
exports.getTeaInfo = function (req, res) {
    var userInfo = {
        id: req.session.user.id
    }
    var user = new User(userInfo);
    user.getTeaInfo(function (err, result) {
        if (result.length != 0) {
            return res.send({
                teaInfo: result
            });
        }
        else
            return res.send(401);
    })
    ;
}
exports.updateStuInfo = function (req, res) {
    var userInfo = req.body.stu;
    var user = new User(userInfo);
    user.id = req.session.user.id;
    user.name = req.body.stu.sname;
    user.updateStuInfo(function (err) {
        if (err) {
            return res.send(401);
        }
        else
            return res.send(200);
    })
}
exports.changePassword = function (req, res) {
    var userInfo = {
        id: req.session.user.id,
        oldPassword: req.body.pwd.old,
        newPassword: req.body.pwd.new1,
        levels: req.session.user.levels
    }
    var user = new User(userInfo);
    var tableName;
    var idName;
    if (user.levels == 1) {
        tableName = "student_info";
        idName = "sid";
    } else {
        tableName = "teacher_info"
        idName = "tid";
    }
    user.comparePassword(function (err, result) {
        if (result[0].pwd != crypto.createHash('sha1').update(req.body.pwd.old).digest("base64")) {
            return res.send({msg: "原密码不正确"});
        }
        else {
            user.changePassword(tableName, idName, function (err) {
                if (err) {
                    return res.send({msg: "未知错误"});
                }
                else
                    return res.send({msg: "修改成功"});
            })
        }
    })
}
exports.getAllUserInfo = function (req, res) {

    if (req.session.user.levels == 1) {
        var currentPage = req.query.currentPage;
        var pageSize = req.query.pageSize;
        var totalSize = 0;
        var sql_count;
        sql_count = "select count(id) as count from all_persons";
        client.getDbCon(sql_count, function (err, userCount) {
            if (userCount) {
                totalSize = userCount[0].count;
            }
        });
        var sql = "select id,name,levels from all_persons limit " + (currentPage - 1) * pageSize + "," + pageSize;
        client.getDbCon(sql, function (err, allUserInfo) {
            if (allUserInfo.length != 0) {
                return res.send({
                    allUserInfo: allUserInfo,
                    totalSize: totalSize
                });
            } else {
                return res.sendStatus(401);
            }
        });
    }
    else return res.sendStatus(401);
}
exports.getAllUserByID = function (req, res) {
    if (req.session.user.levels == 1) {
        var sql = "select id,name,levels from all_persons where id="+req.query.alluserid;
        console.log(sql);
        client.getDbCon(sql, function (err, allUser) {
            if (allUser.length != 0) {
                return res.send({
                    allUser: allUser,
                });
            } else {
                return res.sendStatus(401);
            }
        });
    }
    else return res.sendStatus(401);
}

