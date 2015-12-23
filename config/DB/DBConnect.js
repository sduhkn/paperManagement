/**
 * Created by Administrator on 2015/12/3.
 */
var conn, mysql, conf, pool;

client = null;

mysql = require('mysql');
conf = require('./DBsettings');
pool = mysql.createPool(conf.mysql);
conn = mysql.createConnection(conf.mysql);

function handleError() {
    conn.connect(function (err) {
        if(err){
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });
    conn.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
}
handleError();
exports.getDbConParams = function(sql,params,callback) {
    conn.beginTransaction(function(err) {
        if (err) { console(err); }
        conn.query(sql, params, function(err ,result) {
            if(err) {
                return conn.rollback(function(){
console.log("commit error!");
                });
            }
            conn.commit(function(err) {
                if(err) {
                    return conn.rollback(function(){
console.log("commit error!");
                    });
                }
                callback(err, result);
console.log("commit success!");
            })
        });
    });
    /*pool.getConnection(function (err, conn) {
        conn.beginTra
        conn.query(sql, params, function (err, result) {
            if (err)
                throw err;
            else {
                callback(err, result);
            }
        });

        conn.release();
    });*/
};

exports.getDbCon = function(sql, callback){
    conn.beginTransaction(function(err) {
        if (err) { throw err; }
        conn.query(sql, function(err ,result) {
            if(err) {
                return conn.rollback(function(){
console.log("commit error!");
                });
            }
            conn.commit(function(err) {
                if(err) {
                    return conn.rollback(function(){
console.log("commit error!");
                    });
                }
                callback(err, result);
console.log("commit success!");
            })
        });
    });
    /*pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            if (err)
                throw err;
            else {
                callback(err, result);
            }
        });
        conn.release();
    });*/
}