/**
 * Created by Administrator on 2015/10/27.
 */
angular.module('myApp',[
    'ui.router','myApp.controllers','myApp.services','ngCookies'])
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.when("", "/login");
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl: "./public/login/login.html",

            });
        $urlRouterProvider.otherwise("/home");
    });
/*angular.module("myApp",[
    'ngRoute','myApp.controllers','myApp.services','ngCookies'])
    .config(function ($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: "./public/login/login.html",
            }).
            otherwise({
                redirectTo: '/'
            });
    });*/
