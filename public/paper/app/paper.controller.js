/**
 * Created by Administrator on 2015/12/16.
 * express paper Controller
 */
var Paper = require('./paper.model');
var client = require('../../../config/DB/DBConnect');
var wait = require('wait.for');

/*function circlePaper(paperInfo){
 var authors = [];
 for(var i=0;i<paperInfo.length;i++){
 var paperResult = new Paper(paperInfo[i]);
 paperResult.getAuthorByPaperID(function(err,authorInfo){
 if(err){ return res.sendStatus(500); }
 authors.push(authorInfo);
 })
 }
 }*/
exports.getMyPaperInfo = function (req, res) {
    console.log("req.session.user:" + req.session.user.id);
    //console.log(req.user);

    var sql = "SELECT * FROM paper_info WHERE paper_info.paperid IN (" +
        "SELECT DISTINCT(paperid) FROM paper_author WHERE authorid =" + req.session.user.id + ") ORDER BY pubDate DESC";
    client.getDbCon(sql, function (err, paperInfo) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            return res.send({
                paperInfo: paperInfo
            });
        }

    });
};


exports.getPaperAuthorByID = function (req, res) {
    var paperInfo = {
        paperid: req.query.paperid
    }
    var paper = new Paper(paperInfo);
    paper.getPaperInfoByID(function (err, result) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            if (result.length != 0) {
                var paperResult = new Paper(result[0]);
                paper.getAuthorByPaperID(function (err, authors) {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    else {
                        if (authors.length != 0) {
                            return res.send({
                                paperInfo: paperResult,
                                authors: authors
                            });
                        } else {
                            return res.sendStatus(401);
                        }
                    }
                });
            } else {
                return res.sendStatus(401);
            }
        }
    })
};
exports.getAuthorByPaperID = function (req, res) {
    var paperInfo = {
        paperid: req.query.paperid
    }
    var paper = new Paper(paperInfo);
    paper.getAuthorByPaperID(function (err, authors) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            if (authors.length != 0) {
                return res.send({
                    authors: authors
                });
            } else {
                return res.sendStatus(401);
            }
        }
    });
};
exports.deletePaper = function (req, res) {
    console.log(req.params.paperid);
    var paperInfo = {
        paperid: req.params.paperid
    };
    var paper = new Paper(paperInfo);
    paper.deletePaper(function (err, result) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            if (result.affectedRows != 0) {
                return res.sendStatus(200);
            }
        }
    });
};


var saveAuthor = function (paper, authors) {
    for (var i = 0; i < authors.length; i++) {
        wait.forMethod(paper, "saveAuthor", authors[i]);
    }

};

exports.addPaper = function (req, res) {
    var paper = new Paper(req.body.paper);
    var authors = req.body.authors;
    console.log(authors);
    paper.save(function (err, result) {
        if (err) {
            console.log('服务器出错');
            res.sendStatus(500);
        } else {
            console.log('paper添加成功');
            wait.launchFiber(saveAuthor, paper, authors);
            return res.sendStatus(200);
        }
    })

};

exports.getAllPaperInfo = function (req, res) {
    var currentPage = req.query.currentPage;
    var pageSize = req.query.pageSize;
    var totalSize = 0;
    var sql_count;
    if (req.cookies['paperCount'] && req.cookies['paperCount'] != 0) {
        totalSize = req.cookies['paperCount'];
    } else {
        sql_count = "select count(paperid) as count from paper_info";
        client.getDbCon(sql_count, function (err, paperCount) {
            if (paperCount) {
                res.cookie('paperCount', paperCount[0].count, {maxAge: 10 * 60 * 1000});
                totalSize = paperCount[0].count;
            }
        });
    }

    var sql = "select * from paper_info limit " + (currentPage - 1) * pageSize + "," + pageSize;
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
};

exports.getCon_JouInfo = function (req, res) {
    var sql = "select * from con_jou_info";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            res.sendStatus(500);
            console.log("服务器出错");
        }
        else {
            if (result.length != 0) {
                res.send({con_jouInfo: result});
            } else {
                res.sendStatus(400);
            }
        }
    })
};

exports.queryMyPaper = function (req, res) {
    console.log(req.session.user.id);
    var paperInfo = {
        publish: req.query.publish,
        title: req.query.title
    };
    var queryInfo = {
        userId: req.session.user.id,
        startDate: req.query.startDate || '',
        endDate: req.query.endDate || ''
    };
    var paper = new Paper(paperInfo);
    paper.queryMyPaper(queryInfo, function (err, result) {
        if (err) {
            res.sendStatus(500);
            console.log("服务器出错");
        }
        else {
            res.send({paperInfo: result});
        }
    });
};

exports.queryAllPaper = function (req, res) {
    var paperInfo = {
        publish: req.query.publish,
        title: req.query.title
    }
    var queryInfo = {
        startDate: req.query.startDate || '',
        endDate: req.query.endDate || ''
    }
    var paper = new Paper(paperInfo);
    paper.queryAllPaper(queryInfo, function (err, result) {
        if (err) {
            res.sendStatus(500);
            console.log("服务器出错");
        }
        else {
            res.send({paperInfo: result});
        }
    })
}