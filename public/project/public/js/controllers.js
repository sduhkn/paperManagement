/**
 * Created by Administrator on 2015/12/25.
 * angular project controller
 */
angular.module('myApp.controllers')
    .controller('addProjectController', function ($rootScope, $scope, $cookies, userService) {
        /*��ȡ������Ա����Ϣ  ����Աѡ��*/
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
                            $scope.errorMsg = "���û���Ϣ";
                        }
                    }).error(function(){
                        $scope.errorMsg = "����������";
                    });
            }
            $scope.users = {};//����û�����
        };
        $scope.transProjectCharge = function(person) {
            $scope.chargePerson.id = person.id;
            $scope.project.projectcharge = person.name;
        };
    })