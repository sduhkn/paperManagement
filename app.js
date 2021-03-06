
/**
 * Created by Administrator on 2015/10/26.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var app = express();
/*记录log日志*/
var log = require('./public/util/logHelper');
log.use(app);
/*var log4js = require("log4js");
log4js.configure('./config/log4js.json',{});

var logger = log4js.getLogger("dateNormal");//里面的参数对应logjs.json中的 category的属性
logger.setLevel("INFO");

app.use(log4js.connectLogger(logger,{ level: "auto" }));*/

//var login = require('./public/login/app/loginRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));//设置view的根目录
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'')));//设置静态目录
app.use(session({
    secret: "111",//"111"加密信息
    resave: false,
    name: 'session',
    saveUninitialized: true,
    maxAge: 10 * 60 * 1000,
    cookie: {secure: false}
}));

app.set('jwtSecret','YOUR_SECRET_STRING');

//总路由
require('./app/routes/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 404);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;