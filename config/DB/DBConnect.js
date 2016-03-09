/**
 * Created by Administrator on 2015/12/3.
 */
var conn, mysql, conf, pool;

client = null;

mysql = require('mysql');
conf = require('./DBsettings');
pool = mysql.createPool(conf.localhost_mysql);
/*conn = mysql.createConnection(conf.localhost_mysql);

 function connectDB() {
 conn.connect(function (err) {
 if(err){
 console.log('error when connecting to db:', err);
 setTimeout(connectDB , 2000);
 }
 });
 conn.on('error', function (err) {
 console.log('db error', err);
 // 如果是连接断开，自动重新连接
 if (err.code === 'PROTOCOL_CONNECTION_LOST') {
 setTimeout(connectDB , 2000);
 } else {
 throw err;
 }
 });
 }
 connectDB();*/

exports.pool = pool;
exports.getDbConParams = function (sql, params, callback) {
    pool.getConnection(function (err, con) {
        con.beginTransaction(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            con.query(sql, params, function (err, result) {
                if (err) {
                    return con.rollback(function () {
                        console.log("commit error1 \n" + err);
                    });
                }
                con.commit(function (err) {
                    if (err) {
                        return con.rollback(function () {
                            console.log("commit error2!" + err);
                        });
                    }
                    callback(err, result);
                    console.log("commit success!");
                })
            });
        });
        con.release();
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

exports.getDbCon = function getDbCon(sql, callback) {
    pool.getConnection(function (err, con) {
        con.beginTransaction(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            con.query(sql, function (err, result) {
                if (err) {
                    return con.rollback(function () {
                        console.log("commit error1 \n" + err);
                    });
                }
                con.commit(function (err) {
                    if (err) {
                        return con.rollback(function () {
                            console.log("commit error2!" + err);
                        });
                    }
                    callback(err, result);
                    console.log("commit success!");
                })
            });
        });
        con.release();
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
exports.getDbConSQL2 = function getDbCon(sql, callback) {
    pool.getConnection(function (err, con) {
        con.beginTransaction(function (err) {
            if (err) {
                getDbCon(sql, callback);
            }
            con.query(sql[0], function (err, result1) {
                if (err) {
                    return con.rollback(function () {
                        console.log("commit error!");
                    });
                }
                con.commit(function (err) {
                    if (err) {
                        return con.rollback(function () {
                            console.log("commit error!");
                        });
                    }
                    con.query(sql[1], function (err, result2) {
                        if (err) {
                            return con.rollback(function () {
                                console.log("commit error!");
                            });
                        }
                        con.commit(function (err) {
                            if (err) {
                                return con.rollback(function () {
                                    console.log("commit error!");
                                });
                            }
                            callback(err, result2);
                        })
                    });
                })
                console.log("commit success!");
            })
        });
        con.release();
    });
};