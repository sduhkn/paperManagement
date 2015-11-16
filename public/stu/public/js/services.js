/**
 * Created by Administrator on 2015/10/28.
 * stuServices
 */
angular.module('myApp.services')
    .factory('stuService', function ($http) {
        var getPaper = function () {
            return $http.get('/stu/showMyPaper');
        }
        var stuOwnInfo = function () {
            return $http.get('/stu/stuOwnInfo');
        }
        var updateStuInfo= function(stu){
            return $http.post('/stu/updateStuInfo', {
                stu: stu,
            });
        }

        return {
            getPaperInfo: function () {
                return getPaper();
            },
            getStuOwnInfo: function () {
                return stuOwnInfo();
            },
            updateStuInfo: function (stu) {
                return updateStuInfo(stu);
            }

        }
    });