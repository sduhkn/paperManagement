/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');
var Paper = require('../../../app/models/paperModel');
var User = require('../../../app/models/user.model');
var crypto = require('crypto');

exports.getMyPaperInfo = function (req, res) {
    var sql = "select * from paper_info where fauthor = " + req.user.sid;
    userModel.showPaperInfoQueryByID(sql, function (err, result) {
        if (result.length != 0) {
            return res.send({
                paperInfo: result,
                userName: req.user.sname
            });
        } else {
            return res.sendStatus(401);
        }

    });
}
exports.getAllPaperInfo = function (req, res) {
    var currentPage = req.query.currentPage;
    var pageSize = req.query.pageSize;
    var totalSize = 0;
    var sql_count;
    if(req.cookies['paperCount'] && req.cookies['paperCount']!=0){
        totalSize = req.cookies['paperCount'];
    }else{
        sql_count = "select count(paperid) as count from paper_info";
        userModel.showAllPaperInfo(sql_count,function(err, paperCount){
            if(paperCount){
                res.cookie('paperCount',paperCount[0].count,{ maxAge: 10*60*1000 });
                totalSize = paperCount[0].count;
            }
        });
    }

    var sql = "select * from paper_info limit "+(currentPage-1)*pageSize+","+pageSize;
    userModel.showAllPaperInfo(sql, function (err, paperInfo) {
        if (paperInfo.length != 0) {
            return res.send({
                paperInfo: paperInfo,
                totalSize: totalSize
            });
        } else {
            return res.sendStatus(401);
        }

    });
}
exports.getStuOwnInfo = function (req, res) {
    userModel.showStuOwnInfoQueryByID(res, req.user.sid, function (err, result, result1,result2) {
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
    userModel.updateStuInfo(req, res, req.user.sid, function (err) {
        if (err) {
            return res.send({msg: "未知错误"});
        }
        else
            return res.send({msg: "修改成功"});
    })
}
exports.changePassword = function (req, res) {
    userModel.comparePassword(req, res, req.user.sid, function (err, result) {
        if (result[0].password != crypto.createHash('sha1').update(req.body.pwd.old).digest("base64")) {
            return res.send({msg: "原密码不正确"});
        }
        else {
            userModel.changePassword(req, res, req.user.sid, function (err) {
                if (err) {
                    return res.send({msg: "未知错误"});
                }
                else
                    return res.send({msg: "修改成功"});
            })
        }
    })
}
exports.updatePaperInfo = function (req, res) {
    userModel.updatePaperInfo(req, res, function (err) {
        if (err) {
            return res.send(304);
        }
        else{
            return res.send(200);
        }
    })
}
exports.deletePaper = function (req, res) {
    userModel.deletePaper(req, res, function (err) {
        if (err) {
            return res.send(304);
        }
        else
            return res.send(200);
    })
}
/*用户添加论文信息*/
exports.addPaper = function(req, res) {
    var paper = new Paper(req.body.paper);
    paper.save(function(err,result){
        if(err){
            console.log('添加失败');
            res.sendStatus(402);
        }else {
            console.log('添加成功');
            res.sendStatus(200);
        }
    })
}

/**/
exports.queryUserInfo = function(req, res) {
    var user = new User(req.query.user);
    user.queryUserInfo(function(err, result){

    })
}