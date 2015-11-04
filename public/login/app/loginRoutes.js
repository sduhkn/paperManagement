/**
 * Created by Administrator on 2015/10/26.
 * express login routes
 */
var loginCtrl = require('./loginControllers');

module.exports = function(app){
    app.get('/login',function(req, res){
        res.redirect('/#login');
    });
    app.route('/login').post(loginCtrl.login);
    app.route('/logout').get(loginCtrl.logout);
}
