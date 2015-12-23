/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');
var Paper = require('../../../app/models/paperModel');
var User = require('../../../app/models/user.model');
var crypto = require('crypto');
var client = require('../../../config/DB/DBConnect');

exports.getMyPaperInfo = function (req, res) {
console.log("req.session.user:"+req.session.user.id);
console.log(req.user);
    /*var user = new User(req.session.user);
    user.getPaperIDFromPaper_author(function(err, paperResult){
        if(err) { return res.sendStatus(500); }
        else {
console.log(paper);
            var paper = new Paper(paperResult);
            paper.getPaperInfoByID(function(err, result) {
                if(err) { return res.sendStatus(500); }
                else {
                    return res.send({
                        paperInfo: result,
                    });
                }
            })
        }
    })*/
    /*SELECT * FROM paper_info  WHERE paper_info.paperid IN (
     SELECT DISTINCT(paperid) FROM paper_author WHERE authorid = '201513490'
     )
     */
   /* var sql = "select * from paper_info where fauthor = " + req.user.id;*/
    var sql = "SELECT * FROM paper_info  WHERE paper_info.paperid IN ("+
        "SELECT DISTINCT(paperid) FROM paper_author WHERE authorid =" + req.session.user.id + ")";
    userModel.showPaperInfoQueryByID(sql, function (err, result) {
        if(err){ res.sendStatus(500); }
        else {
            return res.send({
                paperInfo: result,
            });
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

exports.deletePaper = function (req, res) {
    userModel.deletePaper(req, res, function (err) {
        if (err) {
            return res.send(304);
        }
        else
            return res.send(200);
    })
}
/*用户 添加或更新 论文信息,和作者信息*/

exports.addPaper = function(req, res) {
    var paper = new Paper(req.body.paper);
    var authors = req.body.authors;
    paper.save(function(err,result){
        if(err){
console.log('paper添加失败');
            res.sendStatus(402);
        }else {
console.log('paper添加成功');
            for(var i=0;i<authors.length;i++){
                paper.saveAuthor(authors[i],function(err, result){
                    if(err){
console.log('author添加失败');
                        return res.sendStatus(402);
                    }
                })
            }
            return res.sendStatus(200);

        }
    })
}

/**/
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
/*获取期刊和会议的信息 供用户选择*/
exports.getCon_JouInfo = function(req, res){
    var sql = "select * from con_jou_info";
    client.getDbCon(sql, function(err, result){
        if(err){ res.sendStatus(500); console.log("服务器错误");}
        else{
            if(result.length !=0 ){
                res.send({con_jouInfo:result});
            }else{
                res.sendStatus(400);
            }
        }
    })
}