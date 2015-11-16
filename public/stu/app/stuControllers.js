/**
 * Created by Administrator on 2015/10/29.
 */
var userModel = require('../../../app/models/userModel');

exports.getMyPaperInfo = function (req, res) {
    console.log(req.user.sid)//req.user就是经过jwt中间件 解密出来的 token
    var sql = "select * from paper_info where fauthor = " + req.user.sid;
    userModel.showPaperInfoQueryByID(sql, function (err, result) {
        if (result.length != 0) {
            return res.send({
                paperInfo: result,
                userName: req.user.sname
            });
        } else {
            return res.sendStatus(401);
        }

    });
}
exports.getStuOwnInfo = function (req, res) {
    userModel.showStuOwnInfoQueryByID(res, req.user.sid, function (err, result, result1) {
        if (result.length != 0) {
            return res.send({
                stu: result[0],
                stype: result1
            });
        }
        else
            return res.sendStatus(401);
    })
    ;
}
exports.updateStuInfo = function (req, res) {
    userModel.updateStuInfo(req, res, req.user.sid, function (err) {
        if (err) {
            res.send({msg: "未知错误"});
        }
        else
            res.send({msg: "修改成功"});
    })
}