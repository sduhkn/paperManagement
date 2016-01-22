/**
 * Created by Administrator on 2015/12/25.
 * angular project controller
 */
angular.module('myApp.controllers')
    .controller('showMyProjectController',function($scope,$cookies,projectService){
        var projectchargeid = JSON.parse($cookies.user).id;
        projectService.getProjectType()
            .success(function(data){
                $scope.projectType = data.codeInfo;
            }).error(function(){ alert('获取项目类型失败');});
        projectService.getMyProject(projectchargeid)
            .success(function(data){
                if(data.projectInfo.length!=0){
                    $scope.projectInfo = data.projectInfo;
                }else{
                    $scope.errorMsg = "用户未有项目信息";
                }
            }).error(function(){
                $scope.errorMsg = "服务器出错";
            });
    })
    .controller('showProjectController',function($scope, $stateParams, projectService){
        projectService.getProjectType()
            .success(function(data){
                $scope.projectType = data.codeInfo;
            }).error(function(){ alert('获取项目类型失败');});
        projectService.getProjectByID($stateParams.projectid)
            .success(function(data){
                $scope.project = data.projectInfo;
            })
    })
    .controller('addProjectController', function ($state, $scope, $cookies, userService, projectService) {
        /*获取所有人员的信息  供人员选择*/
        $scope.project = {
            projectchargename: JSON.parse($cookies.user).name,
            projectchargeid: JSON.parse($cookies.user).id,
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
            $scope.project.projectchargeid = person.id;
            $scope.project.projectchargename = person.name;
        };

        $scope.addProject = function(project){
            projectService.addProject(project)
                .success(function(){
                    alert('添加成功');
                    $state.go('stu.showMyProject');
                }).error(function(){
                    alert('服务器出错，添加失败');
                });
        }
    })