/**
 * Created by Administrator on 2015/10/28.
 * stuServices
 */
angular.module('myApp.services')
    .factory('stuService', function ($http) {
        var getPaper = function () {
            return $http.get('/stu/showMyPaper');
        }

        var getAllPaper = function (currentPage, pageSize) {
            return $http.get('/stu/showAllPaper',{
                params:{
                    currentPage: currentPage, pageSize:pageSize
                }
            });
        }

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

        var updatePaperInfo = function (paper) {
            return $http.post('/stu/updatePaperInfo', {
                paper: paper
            })
        }

        var deleteConfirm = function (paper) {
            return $http.post('/stu/deletePaper', {
                paper: paper
            })
        }

        return {
            getPaperInfo: function () {
                return getPaper();
            },

            getAllPaperInfo: getAllPaper,

            getStuOwnInfo: function () {
                return stuOwnInfo();
            },
            updateStuInfo: function (stu) {
                return updateStuInfo(stu);
            },
            changePassword: function (pwd) {
                return changePassword(pwd);
            },
            updatePaperInfo: function (paper) {
                return updatePaperInfo(paper);
            },
            deleteConfirm: function (paper) {
                return deleteConfirm(paper);
            }
        }
    });