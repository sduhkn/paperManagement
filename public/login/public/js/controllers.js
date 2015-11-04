/**
 * Created by Administrator on 2015/10/28.
 * angular loginController
 */
angular.module('myApp.controllers',[])
    .controller('loginController',function($scope, $http, $state, loginServices){
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
            loginServices.checkLogin(user)
                .success(function(data, status){
                    if(1 === data.state){
                        $state.go('stuHome');
                    }else{
                        $scope.errMsg = data.errMsg;
                    }
                });
        }
    });