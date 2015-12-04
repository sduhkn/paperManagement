/**
 * Created by Administrator on 2015/12/3.
 */
var client, mysql, conf;

client = null;

mysql = require('mysql');
conf = require('./DBsettings');
var pool = mysql.createPool(conf.mysql);
client = mysql.createConnection(conf.mysql);
client.connect(function (err) {
    if(err){
        console.log('error when connecting to db:', err);
    }
});

exports.getDbConParams = function(sql,params,callback) {
    pool.getConnection(function (err, conn) {
        conn.query(sql, params, function (err, result) {
            if (err)
                throw err;
            else {
                callback(err, result);
            }
        });

        conn.release();
    });
};

exports.getDbCon = function(sql, callback){
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
}