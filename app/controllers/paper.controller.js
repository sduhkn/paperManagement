/**
 * Created by Administrator on 2015/12/16.
 */
var Paper = require('../models/paperModel');
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

exports.getAuthorByPaperID = function(req, res) {
    var paperInfo = {
        paperid: req.query.paperid
    }
    var paper = new Paper(paperInfo);
    paper.getAuthorByPaperID(function(err, authors){
        if(err){ return res.sendStatus(500);}
        else {
            if(authors.length != 0){
                return res.send({
                    authors:authors,
                });
            }
            return res.sendStatus(401);
        }
    });
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