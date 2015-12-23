/**
 * Created by Administrator on 2015/12/16.
 */
var paperCtrl = require('../controllers/paper.controller');
module.exports = function(app){
    app.get('/paper/getPaperAuthorByID',paperCtrl.getPaperAuthorByID);
    app.delete('/paper/deletePaper/:paperid',paperCtrl.deletePaper);
}