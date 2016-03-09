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

        var getStype = function () {
            return $http.get('/codeInfo/getCodeInfo', {
                params: {
                    code: 'stype'
                }
            })
        }

        var getTeaInfo = function () {
            return $http.get('/stu/getTeaInfo')
        }
        var getAllUserInfo = function (currentPage, pageSize) {
            return $http.get('/stu/showAllUserInfo', {
                params: {
                    currentPage: currentPage, pageSize: pageSize
                }
            });
        }
        var getAllUserByID = function (alluserid) {
            return $http.get('/stu/getAllUserrByID', {
                params: {
                    alluserid: alluserid
                }
            });
        }
        return {
            getStuOwnInfo: stuOwnInfo,
            updateStuInfo: updateStuInfo,
            changePassword: changePassword,
            getStype: getStype,
            getTeaInfo: getTeaInfo,
            getAllUserInfo: getAllUserInfo,
            getAllUserByID: getAllUserByID
        }
    });