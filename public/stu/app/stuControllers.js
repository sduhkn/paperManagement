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

    if (req.session.user.levels == 3) {
        var currentPage = req.query.currentPage;
        var pageSize = req.query.pageSize;
        var totalSize = 0;
        var sql_count;
        sql_count = "select count(id) as count from all_persons";
        client.getDbCon(sql_count, function (err, userCount) {
            if (userCount) {
                totalSize = userCount[0].count;
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
        });
        //var sql = "select id,name,levels from all_persons limit " + (currentPage - 1) * pageSize + "," + pageSize;
        //client.getDbCon(sql, function (err, allUserInfo) {
        //    if (allUserInfo.length != 0) {
        //        return res.send({
        //            allUserInfo: allUserInfo,
        //            totalSize: totalSize
        //        });
        //    } else {
        //        return res.sendStatus(401);
        //    }
        //});
    }
    else return res.sendStatus(401);
}
exports.getAllUserByID = function (req, res) {
    if (req.session.user.levels == 3) {
        var sql = "select id,name,levels from all_persons where id=" + req.query.alluserid;
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
exports.addAllUser = function (req, res) {
    if (req.session.user.levels == 3) {
        var userInfo = {
            id: req.session.user.id,
            levels: req.session.user.levels
        }
        var user = new User(userInfo);
        var sql;
        var id = req.body.allUser.id;
        var name = req.body.allUser.name;
        var sha1_pwd = crypto.createHash('sha1').update("111111").digest("base64");
        if (!req.body.allUser.levels) {
            sql = "insert into others_info (oid,oname) values('" + id + "','" + name + "')";
        }
        else if (req.body.allUser.levels == 2 || req.body.allUser.levels == 3) {
            sql = "insert into teacher_info (tid,tname,level,password) values('" + id + "','" + name +
                "','" + req.body.allUser.levels + "','" + sha1_pwd + "')";
        } else {
            sql = "insert into student_info (sid,sname,level,password) values('" + id + "','" + name +
                "','" + req.body.allUser.levels + "','" + sha1_pwd + "')";
        }
        console.log(sql);
        user.addAllUser(sql, function (err) {
            if (err) {
                return res.send({msg: "未知错误"});
            }
            else
                return res.send({msg: "添加成功"});
        })
    }
    else return res.sendStatus(401);
}
exports.deleteAllUser = function (req, res) {
    if (req.session.user.levels == 3) {
        var userInfo = {
            id: req.session.user.id,
            levels: req.session.user.levels
        }
        var user = new User(userInfo);
        var sql;
        var id = req.body.allUser.id;
        var name = req.body.allUser.name;
        if (!req.body.allUser.levels) {
            sql = "delete from others_info where oid= '" + id + "'";
        }
        else if (req.body.allUser.levels == 2 || req.body.allUser.levels == 3) {
            sql = "delete from teacher_info where tid= '" + id + "'";
        } else {
            sql = "delete from student_info where sid= '" + id + "'";
        }
        console.log(sql);
        user.deleteAllUser(sql, function (err) {
            if (err) {
                return res.send({msg: "未知错误"});
            }
            else
                return res.send({msg: "添加成功"});
        })
    }
    else return res.sendStatus(401);
}
exports.resetPassword = function (req, res) {
    if (req.session.user.levels == 3) {
        var userInfo = {
            id: req.session.user.id,
            levels: req.session.user.levels
        }
        var user = new User(userInfo);
        var sql;
        var id = req.body.allUser.id;
        var sha1_pwd = crypto.createHash('sha1').update("111111").digest("base64");
        if (req.body.allUser.levels == 2 || req.body.allUser.levels == 3) {
            sql = "update teacher_info set password= '" + sha1_pwd + "' where tid='" + id + "'";
        } else {
            sql = "update student_info set password= '" + sha1_pwd + "' where sid='" + id + "'";
        }
        console.log(sql);
        user.resetPassword(sql, function (err) {
            if (err) {
                return res.send({msg: "未知错误"});
            }
            else
                return res.send({msg: "添加成功"});
        })
    }
    else return res.sendStatus(401);
}

