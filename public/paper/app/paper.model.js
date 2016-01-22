/**
 * Created by Administrator on 2015/11/2.
 */
var client = require('../../../config/DB/DBConnect');
var moment = require("moment");


function Paper(paper) {
    this.paperid = paper.paperid ? paper.paperid:moment(new Date()).format('YYYYMMDDHHmmss');
    this.title = paper.title?paper.title:'';
    this.included = paper.included ? paper.included:'';//收录情况
    this.factor = paper.factor ? paper.factor: 0;//影响因子
    this.isfistSDU = paper.isfistSDU ? paper.isfistSDU: '1';//第一位是否为山大
    this.isccf = paper.isccf ? paper.isccf: '2';
    this.ccflevel = paper.ccflevel ? paper.ccflevel: '';
    this.isconference = paper.isconference ? paper.isconference: '';
    this.publish = paper.publish ? paper.publish: '';
    this.pubabb = paper.pubabb ? paper.pubabb : '';//论文简称
    this.pubdate = paper.pubdate ? paper.pubdate: '0000-00-00';
    this.column = paper.column ? paper.column: '';//卷（期刊论文专用，会议论文不填）
    this.issue = paper.issue ? paper.issue: '';//期（期刊论文专用，会议论文不填）
    this.spage = paper.spage ? paper.spage: 0;//起始页
    this.tpage = paper.tpage ? paper.tpage: 0;//结束页
    this.wordcount = paper.wordcount ? paper.wordcount: 0;
    this.fauthor = paper.fauthor ? paper.fauthor: '';
    this.cauthor = paper.cauthor ? paper.cauthor: '';
    this.fee = paper.fee ? paper.fee:0 ;
    this.currency = paper.currency ? paper.currency: '1';
    this.modeofpayment = paper.modeofpayment ? paper.modeofpayment: '1';
    this.paymentDate = paper.paymentDate ? paper.paymentDate: '0000-00-00';
    this.comment = paper.comment ? paper.comment: '';
}

module.exports = Paper;

Paper.prototype.save = function save(callback) {
    var sql = "replace into paper_info values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var params = [
        this.paperid,this.title,this.included,this.factor,this.isfistSDU,this.isccf,this.ccflevel,this.isconference,
        this.publish,this.pubabb,this.pubdate,this.column,this.issue,this.spage,this.tpage,this.wordcount,this.fauthor,
        this.cauthor,this.fee,this.currency,this.modeofpayment,this.paymentDate,this.comment];
    client.getDbConParams(sql, params, function(err, result){
        if(err){ throw  err }
        else {
console.log("Paper.prototype.save result:"+result);
            callback(err, result);
        }
    });
}
/*在paper_author表里添加信息*/
Paper.prototype.saveAuthor = function saveAuthor(author,callback) {
    var sql = "replace into paper_author(paperid,authorid,station,authorname) values(?,?,?,?)";
    var params = [this.paperid,author.authorid,author.station,author.authorname];
    client.getDbConParams(sql, params, function(err, result){
        if(err) { throw err}
        else {
            callback(err, result);
        }
    })
}

Paper.prototype.getPaperInfoByID = function getPaperInfoByID(callback) {
    var sql = "select * from paper_info where paperid =" + this.paperid;
    client.getDbCon(sql, function(err, result) {
        if(err) { throw err}
        else {
            callback(err, result);
        }
    })
}

Paper.prototype.getAuthorByPaperID = function(callback) {
    var sql = "SELECT * FROM paper_author WHERE paperid =" + this.paperid + " order by station";
    client.getDbCon(sql, function(err, result) {
        if(err) { throw err; }
        else {
            callback(err, result);
        }
    })
}

Paper.prototype.deletePaper = function(callback) {
    var sql = 'delete from paper_info where paperid = ' + this.paperid;
    client.getDbCon(sql, function(err, result) {
        if(err) { throw err; }
        else {
            callback(err, result);
        }
    })
}

Paper.prototype.queryMyPaper = function(queryInfo,callback) {
    var sql = "SELECT * FROM paper_info  WHERE paper_info.paperid IN ("+
        "SELECT DISTINCT(paperid) FROM paper_author WHERE authorid =" + this.paperid + ") ";
    if(this.title){
        sql += "and title like '%"+this.title+"%' ";
    }
    if(this.publish){
        sql +=  "and publish like '%"+this.publish+"%' ";
    }
    if(queryInfo.startDate){
        sql += "and pubDate between '"+ queryInfo.startDate + "' and '"+queryInfo.endDate+"' "
    }
    sql += "ORDER BY pubDate DESC";
    console.log(sql);
    client.getDbCon(sql,function(err, result){
        if(err) { throw err; }
        else {
            callback(err, result);
        }
    })
}