/**
 * Created by Administrator on 2015/12/16.
 */
var paperCtrl = require('./paper.controller');
var expressJWT = require('express-jwt');

module.exports = function (app) {
    app.get('/paper/getPaperAuthorByID', paperCtrl.getPaperAuthorByID);
    /*��������չʾ������Ϣ*/
    app.get('/paper/getAuthorByPaperID', paperCtrl.getAuthorByPaperID)
    app.delete('/paper/deletePaper/:paperid', paperCtrl.deletePaper);
    app.get('/paper/showMyPaper', expressJWT({secret: app.get('jwtSecret')}), paperCtrl.getMyPaperInfo);
    app.get('/paper/showAllPaper', paperCtrl.getAllPaperInfo);

    app.post('/paper/addPaper', paperCtrl.addPaper);
    /*�û����������Ϣ*/

    app.get('/paper/getCon_JouInfo', paperCtrl.getCon_JouInfo);

    app.get('/paper/queryMyPaper', paperCtrl.queryMyPaper);
    app.get('/paper/queryAllPaper', paperCtrl.queryAllPaper);
}