/**
 * Created by Administrator on 2015/11/2.
 */
var client = require('../../config/DB/DBConnect');

function Paper(paper) {
    this.paperid = paper.paperid;
    this.title = paper.title;
    this.included = paper.included;//收录情况
    this.factor = paper.factor;//影响因子
    this.isccf = paper.isccf;
    this.ccflevel = paper.ccflevel;
    this.ifconference = paper.ifconference;
    this.publish = paper.publish;
    this.publishdate = paper.publishdate;
    this.column = paper.column;//卷（期刊论文专用，会议论文不填）
    this.issue = paper.issue;//期（期刊论文专用，会议论文不填）
    this.spage = paper.spage;//起始页
    this.tpage = paper.tpage;//结束页
    this.fauthor = paper.fauthor;
    this.cauthor = paper.cauthor;
    this.fee = paper.fee;
    this.currency = paper.currency;
    this.modeofpayment = paper.modeofpayment;
    this.paymentDate = paper.paymentDate;
    this.wordcount = paper.wordcount;
}

module.exports = Paper;

Paper.prototype.save = function save(callback) {
    var sql = "insert into paper_info(paperid,title) values(?,?)"
    client.getDbConParams(sql,[20151203001,this.title],function(err, result){
        if(err){ throw  err}
        else {
            callback(err, result);
        }
    });
}