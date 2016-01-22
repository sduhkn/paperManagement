/**
 * Created by Administrator on 2015/12/27.
 */
var projectCtrl = require('./project.controller');
module.exports = function(app){
    app.get('/project/:projectid',projectCtrl.getProject);
    app.post('/addProject',projectCtrl.addProject);
    app.get('/myProject',projectCtrl.getMyProject);
}