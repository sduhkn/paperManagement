/**
 * Created by Administrator on 2015/12/16.
 */
var paperCtrl = require('./paper.controller');
var expressJWT = require('express-jwt');

module.exports = function (app) {
    app.get('/paper/getPaperAuthorByID', paperCtrl.getPaperAuthorByID);
    /*根据论文展示作者信息*/
    app.get('/paper/getAuthorByPaperID', paperCtrl.getAuthorByPaperID)
    app.delete('/paper/deletePaper/:paperid', paperCtrl.deletePaper);
    app.get('/paper/showMyPaper', expressJWT({secret: app.get('jwtSecret')}), paperCtrl.getMyPaperInfo);
    app.get('/paper/showAllPaper', paperCtrl.getAllPaperInfo);

    app.post('/paper/addPaper', paperCtrl.addPaper);
    /*用户添加论文信息*/

    app.get('/paper/getCon_JouInfo', paperCtrl.getCon_JouInfo);

    app.get('/paper/queryMyPaper', paperCtrl.queryMyPaper);
    app.get('/paper/queryAllPaper', paperCtrl.queryAllPaper);
}