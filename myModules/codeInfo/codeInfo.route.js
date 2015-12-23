/**
 * Created by Administrator on 2015/12/13.
 */
var codeInfoCtrl = require('./codeInfo.controller');
module.exports = function(app){
    app.get('/codeInfo/getCodeInfo',codeInfoCtrl.getcodeInfo);
}