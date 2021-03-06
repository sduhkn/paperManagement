/**
 * Created by Administrator on 2015/10/27.
 */
angular.module('myApp',['ui.router','myApp.controllers'
    ,'myApp.services','ngCookies'])
    .config(function($stateProvider,$urlRouterProvider,$httpProvider){
        $urlRouterProvider.when("", "/login");
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl: "./public/login/login.html",
            });
        $urlRouterProvider.otherwise("/home");
        //$httpProvider.interceptors.push('TokenInterceptor');
    })
    .run(function($rootScope, $state, $window){
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if(toState.name == 'login') return;// 如果是进入登录界面则允许
            //redirect only if both isLogged is false and no token is set
            if(fromState.name !== 'login'){
                if (!!$window.sessionStorage.token && !!$window.sessionStorage.userInfo) {
                    return ;
                }else{
                    event.preventDefault();// 取消默认跳转行为
                    $state.go('login');
                }
            }
        });
        $rootScope.$on("stateChangeSuccess", function(event, current, previous, eventObj){
            console.log("event");
        });
        $rootScope.$on("$stateChangeError", function(event, current, previous, eventObj) {
            $state.go('login');
        });
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
