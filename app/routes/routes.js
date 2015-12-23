/**
 * Created by Administrator on 2015/10/28.
 */
/*
* 总route
* */
module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('index');
    });
    require('../../public/login/app/loginRoutes')(app);
    require('../../public/stu/app/stuRoutes')(app);
    require('../../myModules/UserManagement/userManagement.route')(app);
    require('../../myModules/codeInfo/codeInfo.route')(app);
    require('./paper.route')(app);
}