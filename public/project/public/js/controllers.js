/**
 * Created by Administrator on 2015/12/25.
 * angular project controller
 */
angular.module('myApp.controllers')
    .controller('addProjectController', function ($rootScope, $scope, $cookies, userService) {
        /*获取所有人员的信息  供人员选择*/
        $scope.chargePerson = {};
        $scope.project = {
            projectcharge: JSON.parse($cookies.user).name,
        };
        $scope.queryUserInfoByNameOrID = function(users) {
            if(users.name || users.id){
                if(!users.name){
                    users.name = '';
                }
                if(!users.id){
                    users.id = '';
                }
                userService.queryUserInfoByNameOrID(users)
                    .success(function(data){
                        if(data.userList.length != 0){
                            $scope.userList = data.userList;
                        }else{
                            $scope.errorMsg = "无用户信息";
                        }
                    }).error(function(){
                        $scope.errorMsg = "服务器出错";
                    });
            }
            $scope.users = {};//清空用户输入
        };
        $scope.transProjectCharge = function(person) {
            $scope.chargePerson.id = person.id;
            $scope.project.projectcharge = person.name;
        };
    })