/**
 * Created by Administrator on 2015/10/29.
 * express stu routes
 */

var stuCtrl = require('./stuControllers');
//var ensureAuthorized = require('../../../myModules/Authentication/ensureAuthorized'); 自己可以写中间件
var expressJWT = require('express-jwt');


module.exports = function(app){
    app.get('/stu',function(req, res){
        res.redirect('/#stu');
    });
    app.get('/stu/showMyPaper',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.getMyPaperInfo);
    app.get('/stu/showAllPaper',stuCtrl.getAllPaperInfo);
    app.get('/stu/stuOwnInfo',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.getStuOwnInfo);
    app.post('/stu/updateStuInfo',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.updateStuInfo);
    app.post('/stu/changePwd',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.changePassword);
    app.post('/stu/updatePaperInfo',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.updatePaperInfo);
    app.post('/stu/deletePaper',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.deletePaper);
    app.post('/stu/addPaper',stuCtrl.addPaper);
    app.get('/stu/queryUserInfoByNameOrID',stuCtrl.queryUserInfoByNameOrID);
}