/**
 * Created by Administrator on 2015/10/29.
 * express stu routes
 */

var stuCtrl = require('./stuControllers');
//var ensureAuthorized = require('../../../myModules/Authentication/ensureAuthorized'); �Լ�����д�м��
var expressJWT = require('express-jwt');


module.exports = function(app){
    app.get('/stu',function(req, res){
        res.redirect('/#stu');
    });
    app.get('/stu/showMyPaper',expressJWT({secret: app.get('jwtSecret')}),stuCtrl.getMyPaperInfo);


}