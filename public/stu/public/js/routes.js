/**
 * Created by Administrator on 2015/10/28.
 * angular stu routes
 */

angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stuHome', {
                url: '/home',
                views: {
                    '':{
                        templateUrl: "./public/stu/stuHome.html",
                    },
                    'stuRight@stuHome':{
                        template: '<p>welcome to the home</p>',
                    }
                },
                /*resolve: {
                    Authorization: function(){

                    }

                },*/
            })
            .state('stuHome.showMyPaper',{
                url: '/showMyPaper',
                views:{
                    'stuRight':{
                        templateUrl: "./public/stu/showMyPaper.html",
                    }
                }
            })
            .state('stuHome.editPaper',{
                url: '/editPaper',
                views:{
                    'stuRight':{
                        templateUrl: "./public/stu/editPaper.html",
                    }
                }
            })
            .state('stuHome.page2',{
                url: '/page2',
                views:{
                    'stuRight':{
                        templateUrl: "./public/stu/page2.html",
                    }
                }
            });
    });
/*angular.module("myApp")
    .config(function ($routeProvider){
        $routeProvider.
            when('/home', {
                templateUrl: "./public/stu/stuHome.html",
            })
    });*/
