/**
 * Created by Administrator on 2015/12/27.
 */
var projectCtrl = require('./project.controller');

module.exports = function (app) {
    app.get('/project/:projectid', projectCtrl.getProject);
    app.post('/addProject', projectCtrl.addProject);
    app.post('/editProject/:projectid', projectCtrl.editProject);
    app.post('/editProjectPaper/:projectid', projectCtrl.editProjectPaper);
    app.get('/myProject', projectCtrl.getMyProject);
    app.post('/deleteProject/:projectid', projectCtrl.deleteProject);
    app.get('/getPaperByProjectId/:projectid',projectCtrl.getPaperByProjectId);
}