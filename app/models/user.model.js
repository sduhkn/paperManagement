/**
 * Created by Administrator on 2015/12/4.
 */
/**
 * Created by Administrator on 2015/11/2.
 */
var client = require('../../config/DB/DBConnect');

function User(user) {
    this.id = user.id;
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
User.prototype.queryUserInfo = function queryUserInfo(callback) {
    var querySQL = "select * from all_persons where name = ?";
    client.getDbConParams(querySQL, this.name,function(err, result) {
        if(err){ throw err }
        else{
            callback(err, result);
        }
    })
}