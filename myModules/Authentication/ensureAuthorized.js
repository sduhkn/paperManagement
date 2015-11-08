/**
 * Created by Administrator on 2015/11/8.
 */
module.exports = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["Authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}