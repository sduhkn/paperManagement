/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController', function ($scope, $state, $http, $window) {
        $scope.$state = $state;
        $scope.logout = function () {
            $http.post("/logout")
                .success(function () {
                    $window.sessionStorage.userInfo = null;
                    $window.sessionStorage.token = null;
                    $state.go("login");
                });
        }
    })
    .controller('stu_showPaperInfoController', function ($scope, $state, $window, stuService) {
        /*showMyPaper.html controller*/
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8000,
            totalPage: 1,
            itemsPerPage: 15,
            pagesLength: 8
        };
        stuService.getMyPaper()
            .success(function (data) {
                if (data.paperInfo.length != 0) {
                    $scope.paperInfo = data.paperInfo;
                } else {
                    $scope.errMsg = "该用户未发表文章";
                }
            }).error(function () {
            $scope.errMsg = "服务器出错";
        });
        $scope.editPaper = function (paper, included) {
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
        stuService.getStype()
            .success(function (data) {
                $scope.stype = data.codeInfo;
                //for (var i = 0; i < $scope.stype.length; i++) {
                //if ($scope.stu.stype == $scope.stype[i].codeid) {
                //    $scope.stu.stype = $scope.stype[i].content;
                //}
                //}
                //console.log($scope.stype);
            }).error(function () {
            console.log("stype 获取失败");
        });
        stuService.getTeaInfo()
            .success(function (data) {
                $scope.teaInfo = data.teaInfo;
                //for (var i = 0; i < $scope.stype.length; i++) {
                //if ($scope.stu.stype == $scope.stype[i].codeid) {
                //    $scope.stu.stype = $scope.stype[i].content;
                //}
                //}
                //console.log($scope.stype);
            }).error(function () {
            console.log("teaInfo 获取失败");
        });
        stuService.getStuOwnInfo()
            .success(function (data) {
                $scope.stu = data.stu;
                $scope.stu.enrolldate = new Date(data.stu.enrolldate);
                $scope.stu.graduationdate = new Date(data.stu.graduationdate);
                //$scope.stype = data.stype;
                //$scope.teaInfo = data.teaInfo;
            })
            .error(function (data, status) {
                alert("error: " + status);
            });
        $scope.updateStuInfo = function () {
            stuService.updateStuInfo($scope.stu)
                .success(function (data, status) {
                    alert("修改成功");
                })
                .error(function (data, status) {
                    alert("未知错误");
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
    )
    .controller('showAllUserInfoController', function ($scope, stuService) {
        $scope.paginationConf = {
            currentPage: 1,
            totalPage: 1, //总页数
            itemsPerPage: 10, //每页项数
            pagerSize: 5//显示的页码个数
        };
        $scope.load = function () {
            stuService.getAllUserInfo($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage)
                .success(function (data) {
                    $scope.allUserInfo = data.allUserInfo;
                    $scope.paginationConf.totalPage = Math.ceil(data.totalSize / $scope.paginationConf.itemsPerPage);
                })
                .error(function (data, status) {
                    $scope.errMsg = "未知错误";
                });
        };
        $scope.load();
    })
    .controller('showAllUserController', function ($scope, $stateParams, stuService) {
        stuService.getAllUserByID($stateParams.alluserid)
            .success(function (data) {
                $scope.allUser = data.allUser[0];
            }).error(function () {
            alert("出错了");
        });

    })
