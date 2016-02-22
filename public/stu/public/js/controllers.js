/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController', function ($rootScope, $scope, $cookies, $state) {
        var user = angular.fromJson($cookies.user);
        $scope.user = user.name;
        $scope.$state = $state;
        $scope.levels = user.levels;
    })
    .controller('stu_showPaperInfoController', function ($scope, $state, $window, stuService) {
        /*showMyPaper.html controller*/
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8000,
            totalPage:1,
            itemsPerPage: 15,
            pagesLength: 8
        };
        stuService.getMyPaper()
            .success(function (data) {
                if(data.paperInfo.length != 0){
                    $scope.paperInfo = data.paperInfo;
                }else {
                    $scope.errMsg = "该用户未发表文章";
                }
            }).error(function(){
                $scope.errMsg = "服务器出错";
            });
        $scope.editPaper = function (paper,included) {
            $window.sessionStorage.paper = JSON.stringify(paper);
        };
        $scope.deletePaper = function (paperid) {
            if (confirm("确定要删除这篇论文吗？")) {
                stuService.deletePaper(paperid)
                    .success(function (data, status) {
                        alert("删除成功");
                        $state.reload('stu.showMyPaper');
                    })
                    .error(function (data, status) {
                        alert("删除失败");
                    });
            }
        }
    })

    .controller('stuOwnInfoController', function (stuService, $scope) {
        stuService.getStuOwnInfo()
            .success(function (data, status) {
                $scope.stu = data.stu;
                $scope.stu.enrolldate = new Date(data.stu.enrolldate);
                $scope.stu.graduationdate = new Date(data.stu.graduationdate);
                $scope.stype = data.stype;
                $scope.teaInfo = data.teaInfo;
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
    })
    .controller('changePasswordController', function ($scope, stuService) {
            $scope.checkForm = function () {
                if ($scope.pwd.new1 != $scope.pwd.new2) {
                    alert("新密码不一致");
                } else {
                    if ($scope.pwd.old == $scope.pwd.new1) {
                        alert("新旧密码不能相同");
                    }
                    else {
                        if ($scope.pwd.new1.length < 6) {
                            alert("密码须不少于六位");
                        }
                        else {
                            stuService.changePassword($scope.pwd)
                                .success(function (data, status) {
                                    alert(data.msg);
                                })
                                .error(function (data, status) {
                                    alert("error: " + status);
                                });
                        }
                    }
                }
            }
            $scope.resetPwd = function () {
                $scope.pwd.new1 = null;
                $scope.pwd.new2 = null;
                $scope.pwd.old = null;
            }
        }
    );