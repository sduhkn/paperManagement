/**
 * Created by Administrator on 2015/9/10.
 */
var mysql = require("mysql");
var conf = require('../../config/DB/mysql');
var pool = mysql.createPool(conf.mysql);
var crypto = require('crypto');

console.log("DB connect successful");

module.exports = {
    checkLogin: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body.user;
            var sql = 'select sid,sname,password from student_info where sid = ?';
            conn.query(sql, params.sid, function (err, result) {
                if (err)
                    throw err;
                else {
                    callback(err, result);
                }
            });
            conn.release();
        });
    },
    // show user herself paper info
    showPaperInfoQueryByID: function (sql, callback) {
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, result) {
                if (err)
                    throw err;
                else {
                    callback(err, result);
                }
            });
            conn.release();
        });
    },
    showAllPaperInfo: function (sql, callback) {
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, result) {
                if (err)
                    throw err;
                else {
                    callback(err, result);
                }
            });
            conn.release();
        });
    },
    showStuOwnInfoQueryByID: function (res, params, callback) {
        pool.getConnection(function (err, conn) {
            var sql1 = "select sid,sname,sex,stype,content,school,major,enrolldate,graduationdate,tid,gschool from student_info,code_info " +
                "where sid = ? and code_info.code='stype' and student_info.stype = code_info.codeid";
            conn.query(sql1, params, function (err, result) {
                if (result.length != 0) {
                    var sql2 = "select content,codeid from code_info where code_info.code='stype'"
                    conn.query(sql2, function (err, result1) {
                        if (result1.length != 0) {
                            var sql3 = "select tid,tname from teacher_info"
                            conn.query(sql3, function (err, result2) {
                                callback(err, result, result1,result2);
                            });
                        }
                    });
                }
            });
            conn.release();
        });
    },
    comparePassword: function (req, res, sid, callback) {
        pool.getConnection(function (err, conn) {
            var sql = 'select password from student_info where sid = ?';
            conn.query(sql, sid, function (err, result) {
                if (result)
                    callback(err, result);
            });
            conn.release();
        });
    },
    changePassword: function (req, res, sid, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body;
            var sha1_pwd = crypto.createHash('sha1').update(params.pwd.new1).digest("base64");
            var sql = 'update student_info set password =? where sid = ?';
            conn.query(sql, [sha1_pwd, sid], function (err, result) {
                callback(err);
            });
            conn.release();
        });
    },
    updatePaperInfo: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body.paper;
            var sql = 'update paper_info set title =?,pubdate=?,spage=?,tpage=?,fauthor=? where paperid = ?';
            conn.query(sql, [params.title, new Date(params.pubdate), params.spage,
                params.tpage, params.fauthor, params.paperid], function (err, result) {
                console.log(result);
                callback(err);
            });
            conn.release();
        });
    },
    updateStuInfo: function (req, res, sid, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body.stu;
            var sql = 'update student_info set sname=?,sex=?,stype=?,school=?,major=?,enrolldate=?,graduationdate=?,tid=?,gschool=? where sid = ?';
            conn.query(sql, [params.sname, params.sex, params.stype, params.school, params.major,
                new Date(params.enrolldate), new Date(params.graduationdate), params.tid, params.gschool, sid], function (err, result) {
                callback(err);
            });
            conn.release();
        });
    },
    deletePaper: function (req, res, callback) {
        pool.getConnection(function (err, conn) {
            var params = req.body;
            var sql = 'delete from paper_info where paperid = ?';
            conn.query(sql, [params.paper.paperid], function (err, result) {
                callback(err);
            });
            conn.release();
        });
    },
};
