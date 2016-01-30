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
                        templateUrl: "./public/stu/stuHome.html",
                    },
                    'stuRight@stu': {
                        template: '<p>welcome to the home</p>',
                    }
                },
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
                },
            })
            .state('stu.editPaper', {
                url: '/editPaper/:paperid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/editPaper.html",
                    }
                },
            })
            .state('stu.showPaper', {
                url: '/showPaper/:paperid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/showPaper.html",
                    }
                },
            })
            .state('stu.showAllPaper', {
                url: '/showAllPaper',
                views: {
                    'stuRight': {
                        templateUrl: "./public/paper/showAllPaper.html",
                    }
                },
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
                },
            })
            .state('stu.showProject', {
                url: '/project/:projectid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/project/showProject.html",
                    }
                },
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
                },
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
                    },
                },
            })
            .state('stu.editProjectPaper', {
                url: '/editProjectPaper/:projectid',
                views: {
                    'stuRight': {
                        templateUrl: "./public/project/editProjectPaper.html",
                    }
                },
            })
    });
/*angular.module("myApp")
 .config(function ($routeProvider){
 $routeProvider.
 when('/home', {
 templateUrl: "./public/stu/stuHome.html",
 })
 });*/
