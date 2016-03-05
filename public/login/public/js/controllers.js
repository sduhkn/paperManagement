/**
 * Created by Administrator on 2015/10/28.
 * angular loginController
 */
angular.module('myApp.controllers',['myApp.directives'])
    .controller('loginController',function($scope, $state, $window, authenticationService){
        var user = {
            id: "",
            password: ""
        };
        $scope.clickLogin = function(user){
            var promise = authenticationService.login(user);
            promise
                .then(function success(data){
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.userInfo = JSON.stringify(data.user);
                    $state.go('stu');
                },function error(err){
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.userInfo;
                    $scope.errMsg = "用户名密码错误";
                });
        }
    });