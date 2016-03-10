/**
 * Created by Administrator on 2015/12/4.
 */
/**
 * Created by Administrator on 2015/11/2.
 */
var client = require('../../config/DB/DBConnect');
var crypto = require('crypto');

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
    this.levels = user.levels;//用户的级别
    this.oldPassword = user.oldPassword;
    this.newPassword = user.newPassword;
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
    var querySQL = "select * from all_persons where 1=1 ";//机智的1=1
    if (this.name) {
        querySQL += "and name like '%" + this.name + "%'";
    }
    if (this.id) {
        querySQL += "and id like '%" + this.id + "%' ";
    }
    console.log(querySQL);
    client.getDbCon(querySQL, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    })
};
/*从paper_author获取paperid*/
User.prototype.getPaperIDFromPaper_author = function getPaperIDFromPaper_author(callback) {
    var sql = "select distinct(paperid) from paper_author where authorid = ?";
    client.getDbConParams(sql, this.id, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    })
};

User.prototype.getAllUser = function (callback) {
    var sql = "select id,name from all_persons";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    });
};

User.prototype.checkLogin = function (callback) {
    var sql = "select * from all_persons where id = " + this.id;
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    })

};
User.prototype.showStuOwnInfoQueryByID = function (callback) {
    var sql = "select * from student_info where sid = " + this.id;
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    });
};
User.prototype.getTeaInfo = function (callback) {
    var sql = "select tid,tname from teacher_info";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    });
};
User.prototype.comparePassword = function (callback) {
    var sql = 'select pwd from all_persons where id =' + this.id;
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result[0]);
            callback(err, result);
        }
    });
};
User.prototype.changePassword = function (tableName, idName, callback) {
    var sha1_pwd = crypto.createHash('sha1').update(this.newPassword).digest("base64");
    var sql = 'update ' + tableName + ' set password =? where ' + idName + ' = ' + this.id;
    client.getDbConParams(sql, sha1_pwd, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err);
        }
    });
};
User.prototype.updateStuInfo = function (callback) {
    var sql = 'update student_info set sname=?,sex=?,stype=?,school=?,major=?,enrolldate=?,' +
        'graduationdate=?,tid=?,gschool=? where sid = ?';
    client.getDbConParams(sql, [this.name, this.sex, this.stype, this.school, this.major,
        new Date(this.enrolldate), new Date(this.graduationdate), this.tid, this.gschool, this.id], function (err) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err);
        }
    });
};
User.prototype.addAllUser = function (sql, callback) {
    client.getDbConParams(sql, sha1_pwd, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err);
        }
    });
};
