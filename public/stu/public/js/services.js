/**
 * Created by Administrator on 2015/10/28.
 * stuServices
 */
angular.module('myApp.services')
    .factory('stuService', function ($http) {
        /*addPaper预处理service开始 */
        var getIncluded = function(){
            return $http.get('/codeInfo/getCodeInfo',{
                params: {
                    code: 'included'
                }
            });
        }
        var getCurrency = function(){
            return $http.get('/codeInfo/getCodeInfo',{
                params:{
                    code:'currency'
                }
            })
        }
        var getModeOfPayment = function(){
            return $http.get('/codeInfo/getCodeInfo',{
                params:{
                    code:'modeofpayment'
                }
            })
        }
        /*addPaper预处理service结束 */

        var getMyPaper = function() {
            return $http.get('/stu/showMyPaper');
        }

        var getPaperAuthorByID = function(paperid){
            return $http.get('/paper/getPaperAuthorByID',{
                params: {
                    paperid : paperid
                }
            });
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


        var deletePaper = function (paperid) {
            return $http.delete('/paper/deletePaper/'+paperid);
        }
        /*用户添加paper*/
        var addPaper = function(paper,authors) {
            return $http.post('/stu/addPaper', {
                paper: paper,authors:authors
            })
        }
        /*条件查询用户信息*/
        var queryUserInfoByNameOrID = function(users) {
            return $http.get('/user/queryUserInfoByNameOrID', {
                params: {
                    users: JSON.stringify(users)
                }
            });
        }

        return {
            getMyPaper: getMyPaper,
            getPaperAuthorByID: getPaperAuthorByID,

            getAllPaperInfo: getAllPaper,
            addPaper: addPaper,
            queryUserInfoByNameOrID: queryUserInfoByNameOrID,

            getStuOwnInfo: stuOwnInfo(),
            updateStuInfo:updateStuInfo,
            changePassword: changePassword,

            deletePaper:deletePaper,

            getIncluded: getIncluded,
            getCurrency: getCurrency,
            getModeOfPayment: getModeOfPayment,
        }
    });