/**
 * Created by Administrator on 2015/10/28.
 * angular stu routes
 */

angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stu', {
                url: '/stu',
                views: {
                    '': {
                        resolve:{
                            auth:["$q","$window","authenticationService",function($q, $window, authenticationService) {
                                var userInfo;
                                if ($window.sessionStorage.userInfo) {
                                    userInfo = $window.sessionStorage.userInfo;
                                }else{
                                    userInfo = authenticationService.getUserInfo()
                                }
                                if (userInfo) {
                                    return $q.when(userInfo);
                                } else {
                                    return $q.reject({ authenticated: false });
                                }
                            }]
                        },
                        templateUrl: "./public/stu/stuHome.html",
                        controller: function($scope,auth){
                            $scope.user = JSON.parse(auth);
                        }
                    },
                    'stuRight@stu': {
                        template: '<p>welcome to the home</p>',
                    }
                }
            })
            .state('stu.myInfo', {
                url: '/myInfo',
                views: {
                    'stuRight': {
                        templateUrl: "./public/stu/myInfo.html",
                    }
                }
            })
            .state('stu.changePwd', {
                url: '/changePwd',
                views: {
                    'stuRight': {
                        templateUrl: "./public/stu/changePwd.html",
                    }
                }
            })
            //paper 路由
            .state('stu.showMyPaper', {
                url: '/showMyPaper',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/showMyPaper.html",
                    }
                }
            })
            .state('stu.editPaper', {
                url: '/editPaper/:paperid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/editPaper.html",
                    }
                }
            })
            .state('stu.showPaper', {
                url: '/showPaper/:paperid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/showPaper.html",
                    }
                }
            })
            .state('stu.showAllPaper', {
                url: '/showAllPaper',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/showAllPaper.html",
                    }
                }
            })
            .state('stu.addPaper', {
                url: '/addPaper',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/addPaper.html",
                    }
                }
            })
            /*project 路由*/
            .state('stu.showMyProject', {
                url: '/showMyProject',
                views: {
                    'stuRight': {
                        templateUrl: "./public/project/showMyProject.html",
                    }
                }
            })
            .state('stu.showProject', {
                url: '/project/:projectid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/project/showProject.html",
                    }
                }
            })
            .state('stu.editProject', {
                url: '/editProject/:projectid',
                views: {
                    'stuRight': {
                        resolve: {
                            getProjectType: function($q,projectService){
                                var deferred = $q.defer();
                                projectService.getProjectType()
                                    .success(function(data){
                                        deferred.resolve(data.codeInfo);
                                    }).error(function(){
                                        alert("获取数据失败，服务器出错");
                                    });
                                return deferred.promise;
                            }
                        },
                        templateUrl: "./public/project/editProject.html",
                        controller: function($scope,getProjectType){
                            $scope.projectType = getProjectType;
                        }
                    }
                }
            })
            .state('stu.addProject', {
                url: '/addProject',
                views: {
                    'stuRight': {
                        resolve: {
                            getProjectType: function($q,projectService){
                                var deferred = $q.defer();
                                projectService.getProjectType()
                                    .success(function(data){
                                        deferred.resolve(data.codeInfo);
                                    }).error(function(){
                                        alert("获取数据失败，服务器出错");
                                    });
                                return deferred.promise;
                            }
                        },
                        templateUrl: "./public/project/addProject.html",
                        controller: function($scope,getProjectType){
                            $scope.projectType = getProjectType;
                        }
                    }
                }
            })
            .state('stu.editProjectPaper', {
                url: '/editProjectPaper/:projectid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/project/editProjectPaper.html",
                    }
                }
            })
            .state('stu.showAllProject', {
                url: '/showAllProject',
                views: {
                    'stuRight': {
                        templateUrl: "./public/project/showAllProject.html",
                    }
                }
            })
            .state('stu.showAllUserInfo', {
                url: '/showAllUserInfo',
                views: {
                    'stuRight': {
                        templateUrl: "./public/stu/showAllUserInfo.html",
                    }
                }
            })
            .state('stu.showAllUser', {
                url: '/allUser/:alluserid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/stu/showAllUser.html",
                    }
                }
            })
            .state('stu.addAllUser', {
                url: '/addAllUser',
                views: {
                    'stuRight': {
                        templateUrl: "./public/stu/addAllUser.html",
                    }
                }
            })
    });
/*angular.module("myApp")
 .config(function ($routeProvider){
 $routeProvider.
 when('/home', {
 templateUrl: "./public/stu/stuHome.html",
 })
 });*/
