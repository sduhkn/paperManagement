/**
 * Created by Administrator on 2015/12/13.
 */
var client = require('../../config/DB/DBConnect');
var mysql = require('mysql');

function Code(code) {
    this.code = code.code;
    this.codeid = code.codeid;
    this.content = code.content;
}

module.exports = Code;

Code.prototype.getInfo = function(callback) {
    var sql = "select * from code_info where code = ?"
    client.getDbConParams(sql,this.code,function(err, result){
        if(err){ throw  err }
        else {
            callback(err, result);
        }
    });
}