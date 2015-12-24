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
                /*resolve: {
                 auth: ["$q","authenticationService",function($q, $state, authenticationService){
                 var userInfo = authenticationService.getUserInfo();
                 if(userInfo){
                 alert(123);
                 return $q.when(userInfo);
                 }else{
                 return $q.reject({ authenticated: false });
                 }
                 }]

                 },*/
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
    });
/*angular.module("myApp")
 .config(function ($routeProvider){
 $routeProvider.
 when('/home', {
 templateUrl: "./public/stu/stuHome.html",
 })
 });*/
