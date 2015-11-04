/**
 * Created by Administrator on 2015/10/29.
 * express stu routes
 */
var stuCtrl = require('./stuControllers');

module.exports = function(app){
    app.get('/home',function(req, res){
        res.redirect('/#home');
    });
    app.get('/stu/myPaperInfo',stuCtrl.getMyPaperInfo);
}