/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');

exports.getMyPaperInfo = function(req, res){
    console.log(req.user)//req.user就是经过jwt中间件 解密出来的 token
    var sql = "select * from paper_info where fauthor = " + req.user.sid;
    userModel.showPaperInfoQueryByID(sql,function(err, result){
        if( result.length != 0){
            return res.send({
                paperInfo: result,
                userName: req.user.sname
            });
        }else{
            return res.send(401);
        }

    });
}