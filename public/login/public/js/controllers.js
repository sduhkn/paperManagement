/**
 * Created by Administrator on 2015/10/28.
 * angular loginController
 */
angular.module('myApp.controllers',[])
    .controller('loginController',function($rootScope, $scope, $http, $state, $window, authenticationService){
        $scope.list=[{id:100,age:30,name:"张三"}]
        $scope.add=function(){
            var obj={id:101,age:30,name:"李四"};
            $scope.list.push(obj);
        }
        $scope.del=function(idx){
            $scope.list.splice(idx,1);
        }
        var user = {
            sid: "",
            password: ""
        };
        $scope.clickLogin = function(user){
            var promise = authenticationService.login(user);
            promise
                .then(function(data){
                    $window.sessionStorage.token = data.token;
                    $state.go('stu');
                },function(err){
                    delete $window.sessionStorage.token;
                    $scope.errMsg = "用户名密码错误";
                });
        }
    });