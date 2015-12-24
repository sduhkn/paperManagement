/**
 * Created by Administrator on 2015/12/16.
 * express paper Controller
 */
var Paper = require('./paper.model');
var client = require('../../../config/DB/DBConnect');

exports.getMyPaperInfo = function (req, res) {
    console.log("req.session.user:"+req.session.user.id);
    console.log(req.user);

    var sql = "SELECT * FROM paper_info  WHERE paper_info.paperid IN ("+
        "SELECT DISTINCT(paperid) FROM paper_author WHERE authorid =" + req.session.user.id + ")";
    client.getDbCon(sql, function (err, result) {
        if(err){ res.sendStatus(500); }
        else {
            return res.send({
                paperInfo: result,
            });
        }
    });
}

/*根据论文展示作者信息*/
exports.getPaperAuthorByID = function(req, res) {
    var paperInfo = {
        paperid: req.query.paperid
    }
    var paper = new Paper(paperInfo);
    paper.getPaperInfoByID(function(err, result){
        if(err){ return res.sendStatus(500);}
        else {
            if(result.length != 0){
                var paperResult = new Paper(result[0]);
                paper.getAuthorByPaperID(function(err, authors){
                    if(err){ return res.sendStatus(500);}
                    else {
                        if(authors.length != 0){
                            return res.send({
                                paperInfo:paperResult,
                                authors: authors
                            });
                        }else{
                            return res.sendStatus(401);
                        }
                    }
                });
            }else {
                return res.sendStatus(401);
            }
        }
    })
}
exports.deletePaper = function(req, res) {
    console.log(req.params.paperid);
    var paperInfo = {
        paperid: req.params.paperid
    };
    var paper = new Paper(paperInfo);
    paper.deletePaper(function(err,result){
        if(err){ return res.sendStatus(500);}
        else {
console.log(result);
            if(result.affectedRows != 0){
                return res.sendStatus(200);
            }
        }
    });
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

exports.getAllPaperInfo = function (req, res) {
    var currentPage = req.query.currentPage;
    var pageSize = req.query.pageSize;
    var totalSize = 0;
    var sql_count;
    if(req.cookies['paperCount'] && req.cookies['paperCount']!=0){
        totalSize = req.cookies['paperCount'];
    }else{
        sql_count = "select count(paperid) as count from paper_info";
        client.getDbCon(sql_count,function(err, paperCount){
            if(paperCount){
                res.cookie('paperCount',paperCount[0].count,{ maxAge: 10*60*1000 });
                totalSize = paperCount[0].count;
            }
        });
    }

    var sql = "select * from paper_info limit "+(currentPage-1)*pageSize+","+pageSize;
    client.getDbCon(sql, function (err, paperInfo) {
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