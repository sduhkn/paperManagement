/**
 * Created by Administrator on 2015/10/28.
 * stuServices
 */
angular.module('myApp.services')
    .factory('stuService',function($http){
        var getPaper = function(){
            return $http.get('/stu/myPaperInfo');
        }

        return {
            getPaperInfo: function(){ return getPaper(); }
        }
    });