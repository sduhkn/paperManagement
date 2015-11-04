/**
 * Created by Administrator on 2015/10/28.
 * angular loginServices
 */
angular.module('myApp.services',[])
    .factory('loginServices',function($http){
        var doRequest = function(user){
            return $http.post('/login',{
                user: user,
            });
        }
        return {
            checkLogin: function(user){ return doRequest(user); }
        }
    });