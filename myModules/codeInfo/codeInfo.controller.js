/**
 * Created by Administrator on 2015/12/13.
 */
var Code = require('./codeInfo.model');
exports.getcodeInfo = function(req, res) {
    var codeInfo = { code: req.query.code };
    var code = new Code(codeInfo);
    code.getInfo(function(err, result) {
        if(err){
            return res.sendStatus(500);//服务器出错
        }else {
            if(result.length != 0){
                return res.json({codeInfo: result});
            }
            return res.sendStatus(400);//处理出错

        }
    })
}
