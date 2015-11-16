/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController', function ($rootScope, $scope, $cookies, $state) {

        $scope.user = $cookies.userName;
        $scope.$state = $state;


    })
    .controller('stu_showPaperInfoController', function ($rootScope, $scope, $window, stuService) {
        /*showMyPaper.html controller*/
        stuService.getPaperInfo()
            .success(function (data) {
                $scope.paperInfo = data.paperInfo;
                $rootScope.user.userName = data.userName;
            });
        $scope.editPaper = function (paper) {
            //$window.sessionStorage.setItem('paper',JSON.stringify(paper));
            $window.sessionStorage.paper = JSON.stringify(paper);
        };
    })
    .controller('editPaperController', function ($scope, $window, $state) {
        if ($window.sessionStorage.paper) {
            var editPaperInfo = JSON.parse($window.sessionStorage.paper);
            $scope.paper = editPaperInfo;
            $scope.paper.pubdate = new Date(editPaperInfo.pubdate);
        } else {
            $state.go('showMyPaper');
        }
    })
    .controller('stuOwnInfo', function (stuService, $scope) {
        stuService.getStuOwnInfo()
            .success(function (data, status) {
                $scope.stu = data.stu;
                $scope.stu.enrolldate = new Date(data.stu.enrolldate);
                $scope.stype = data.stype;
            })
            .error(function (data, status) {
                alert("error: " + status);
            });
        $scope.updateStuInfo = function () {
            stuService.updateStuInfo($scope.stu)
                .success(function (data, status) {
                    alert(data.msg);
                })
                .error(function (data, status) {
                    alert(data.msg);
                });
        }
    });
;