/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');

exports.getMyPaperInfo = function(req, res){
    var sql = "select * from paper_info where fauthor = " + req.cookies["userID"];
    userModel.showPaperInfoQueryByID(sql,function(err, result){
        if( result.length != 0)
            res.send({paperInfo: result });
    });
}