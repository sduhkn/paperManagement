/**
 * Created by Administrator on 2015/10/28.
 * stuServices
 */
angular.module('myApp.services')
    .factory('paperService', function ($http) {
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
            return $http.get('/paper/showMyPaper');
        }

        var getPaperAuthorByID = function(paperid){
            return $http.get('/paper/getPaperAuthorByID',{
                params: {
                    paperid : paperid
                }
            });
        }

        var getAllPaper = function (currentPage, pageSize) {
            return $http.get('/paper/showAllPaper',{
                params:{
                    currentPage: currentPage, pageSize:pageSize
                }
            });
        }

        var deletePaper = function (paperid) {
            return $http.delete('/paper/deletePaper/'+paperid);
        }
        /*用户添加paper*/
        var addPaper = function(paper,authors) {
            return $http.post('/paper/addPaper', {
                paper: paper,authors:authors
            })
        }

        var getCon_JouInfo = function(){
            return $http.get('/paper/getCon_JouInfo');
        }

        return {
            getMyPaper: getMyPaper,
            getPaperAuthorByID: getPaperAuthorByID,

            getAllPaperInfo: getAllPaper,
            addPaper: addPaper,
            deletePaper:deletePaper,

            getIncluded: getIncluded,
            getCurrency: getCurrency,
            getModeOfPayment: getModeOfPayment,
            getCon_JouInfo: getCon_JouInfo,
        }
    });