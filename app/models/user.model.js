/**
 * Created by Administrator on 2015/12/4.
 */
/**
 * Created by Administrator on 2015/11/2.
 */
var client = require('../../config/DB/DBConnect');

function User(user) {
    this.id = user.id ? user.id : '';
    this.name = user.name;
    this.sex = user.sex;
    this.stype = user.stype;
    this.school = user.school;
    this.major = user.major;
    this.enrolldate = user.enrolldate;
    this.graduationdate = user.graduationdate;
    this.tid = user.tid;//导师编号
    this.gschool = user.gschool;
    this.level = user.level;//用户的级别
}

module.exports = User;

/*
User.prototype.save = function save(callback) {
    var sql = "insert into paper_info(paperid,title) values(?,?)"
    client.getDbCon(sql,[20151203001,this.title],function(err, result){
        if(err){ throw  err}
        else {
            callback(err, result);
        }
    });
}*/
User.prototype.queryUserInfoByNameOrID = function queryUserInfoByNameOrID(callback) {
    var querySQL = "select * from all_persons where 1=1 ";
    if(this.name){
        querySQL += "and name like '%"+this.name+"%'";
    }
    if(this.id){
        querySQL += "and id like '%"+this.id+"%' ";
    }
    console.log(querySQL);
    client.getDbCon(querySQL, function(err, result) {
        if(err){ throw err }
        else{
            callback(err, result);
        }
    })
}
/*从paper_author获取paperid*/
User.prototype.getPaperIDFromPaper_author = function getPaperIDFromPaper_author(callback) {
    var sql = "select distinct(paperid) from paper_author where authorid = ?";
    client.getDbConParams(sql, this.id, function(err, result){
        if(err) { throw err; }
        else {
            callback(err, result);
        }
    })
}