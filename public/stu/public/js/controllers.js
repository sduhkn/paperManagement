/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController', function ($rootScope, $scope, $cookies, $state) {
        $scope.user = $cookies.userName;
        $scope.$state = $state;
    })
    .controller('stu_showPaperInfoController', function ($scope, $window, stuService) {
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8000,
            totalPage:1,
            itemsPerPage: 15,
            pagesLength: 8,
        };
        /*showMyPaper.html controller*/
        stuService.getPaperInfo()
            .success(function (data) {
                $scope.paperInfo = data.paperInfo;
            });
        $scope.editPaper = function (paper,included) {
            $window.sessionStorage.paper = JSON.stringify(paper);
        };
        $scope.deleteConfirm = function (index, paper) {
            if (confirm("确定要删除这篇论文吗？")) {
                stuService.deleteConfirm(paper)
                    .success(function (data, status) {
                        alert("删除成功");
                        $scope.paperInfo.splice(index, 1);
                    })
                    .error(function (data, status) {
                        alert("删除失败");
                    });
            }
        }
    })
    .controller('stu_showAllPaperInfoController', function ($scope, stuService) {
        /*$scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.pageSize = 10;
        $scope.pages = [];
        $scope.endPage = 1;

        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
                $scope.load();
            }
        };

        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                $scope.load();
            }
        };

        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.load();
        };

        $scope.load = function(){
            stuService.getAllPaperInfo($scope.currentPage, $scope.pageSize)
                .success(function (data) {
                    $scope.paperInfo = data.paperInfo;
                    $scope.totalPage = Math.ceil(data.totalSize / $scope.pageSize);
                    console.log($scope.totalPage);
                    $scope.endPage = $scope.totalPage;
                    //生成数字链接
                    if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                        $scope.pages = [
                            $scope.currentPage - 1,
                            $scope.currentPage,
                            $scope.currentPage + 1
                        ];
                    } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                        $scope.pages = [
                            $scope.currentPage,
                            $scope.currentPage + 1
                        ];
                    } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                        $scope.pages = [
                            $scope.currentPage - 1,
                            $scope.currentPage
                        ];
                    }
                });
        };

        $scope.load();*/
        $scope.paginationConf = {
            currentPage: 1,
            totalPage:1, //总页数
            itemsPerPage: 10, //每页项数
            pagerSize: 5,//显示的页码个数
        };

        $scope.load = function(){
            stuService.getAllPaperInfo($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage)
                .success(function (data) {
                    $scope.paperInfo = data.paperInfo;
                    $scope.paginationConf.totalPage = Math.ceil(data.totalSize / $scope.paginationConf.itemsPerPage);
                    //生成数字链接
                    /*if ($scope.paginationConf.currentPage > 1 && $scope.paginationConf.currentPage < $scope.paginationConf.totalPage) {
                        $scope.paginationConf.pages = [
                            $scope.paginationConf.currentPage - 1,
                            $scope.paginationConf.currentPage,
                            $scope.paginationConf.currentPage + 1
                        ];
                    } else if ($scope.paginationConf.currentPage == 1 && $scope.paginationConf.totalPage > 1) {
                        $scope.paginationConf.pages = [
                            $scope.paginationConf.currentPage,
                            $scope.paginationConf.currentPage + 1
                        ];
                    } else if ($scope.paginationConf.currentPage == $scope.paginationConf.totalPage && $scope.paginationConf.totalPage > 1) {
                        $scope.paginationConf.pages = [
                            $scope.paginationConf.currentPage - 1,
                            $scope.paginationConf.currentPage
                        ];
                    }*/
                });
        };
        $scope.load();

        $scope.editPaper = function (paper) {
            $window.sessionStorage.paper = JSON.stringify(paper);
        };
    })
    .controller('editPaperController', function ($scope, $window, $state, stuService) {
        if ($window.sessionStorage.paper) {
            var editPaperInfo = JSON.parse($window.sessionStorage.paper);
            $scope.paper = editPaperInfo;
            $scope.paper.pubdate = new Date(editPaperInfo.pubdate);
        } else {
            $state.go('showMyPaper');
        }
        $scope.updatePaperInfo = function () {
            stuService.updatePaperInfo($scope.paper)
                .success(function (data, status) {
                    alert('更新成功');
                })
                .error(function (data, status) {
                    alert('更新失败');
                });
        };
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