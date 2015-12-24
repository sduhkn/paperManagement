/**
 * Created by Administrator on 2015/10/28.
 * stuServices
 */
angular.module('myApp.services')
    .factory('stuService', function ($http) {

        var stuOwnInfo = function () {
            return $http.get('/stu/stuOwnInfo');
        }

        var updateStuInfo = function (stu) {
            return $http.post('/stu/updateStuInfo', {
                stu: stu,
            });
        }

        var changePassword = function (pwd) {
            return $http.post('/stu/changePwd', {
                pwd: pwd
            });
        }

        return {
            getStuOwnInfo: stuOwnInfo(),
            updateStuInfo:updateStuInfo,
            changePassword: changePassword,
        }
    });