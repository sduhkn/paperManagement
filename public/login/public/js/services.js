/**
 * Created by Administrator on 2015/10/28.
 * angular loginServices
 */
angular.module('myApp.services', [])
    .factory('authenticationService', function ($http, $q) {

        var userInfo;

        function login(user) {
            var deferred = $q.defer();
            $http.post('/login', {
                user: user,
            }).success(function (data) {
                userInfo = data.user;
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getUserInfo(){
            return userInfo;
        }

        return {
            login: login,
            getUserInfo: getUserInfo
        }
    })/*.factory('TokenInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});*/