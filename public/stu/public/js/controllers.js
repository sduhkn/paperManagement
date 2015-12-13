/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController', function ($rootScope, $scope, $cookies, $state) {
        $scope.user = JSON.parse($cookies.user).userName;
        $scope.$state = $state;
    })
    .controller('stu_showPaperInfoController', function ($scope, $window, stuService) {
        /*showMyPaper.html controller*/
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8000,
            totalPage:1,
            itemsPerPage: 15,
            pagesLength: 8,
        };
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
    )
    .controller("addPaperController", function($scope,$cookies,stuService){
        var myContains = function(a, obj) {
            for(var i = 0; i < a.length; i++) {
                if(a[i].station === obj.station){
                    return true;
                }
            }
            return false;
        }
        $scope.authors = [];//存放所有作者信息
        $scope.paper = {
            isConference : 1,
            chargeAuthor:{
                authorName: JSON.parse($cookies.user).userName,
                authorID: JSON.parse($cookies.user).userID,
            },
            isfistSDU: 1,//第一位是否为山大
            };
        $scope.addPaper = function(paper) {
            stuService.addPaper(paper)
                .success(function(data, status){
                    alert("添加成功");
                }).error(function(){
                    alert('添加失败');
                });
        };
        $scope.getVar = function(){
            console.log("$scope.isfauthor:"+$scope.isfauthor+"\t $scope.isCauthor:"+$scope.isCauthor);
            console.log("$scope.paper.isfistSDU:"+$scope.paper.isfistSDU);
        }
        /*获取所有人员的信息  供人员选择*/
        $scope.queryUserInfoByNameOrID = function(users) {
            if(users.name || users.id){
                if(!users.name){
                    users.name = '';
                }
                if(!users.id){
                    users.id = '';
                }
                stuService.queryUserInfoByNameOrID(users)
                    .success(function(data){
                        if(data.userList.length != 0){
                            $scope.userList = data.userList;
                        }else{
                            $scope.errorMsg = "无用户信息";
                        }
                    }).error(function(){
                        $scope.errorMsg = "服务器出错";
                    });
            }
            $scope.users = {};//清空用户输入
        };
        /*将查询出来的用户添加到页面内*/
        $scope.transUser = function(person) {
            $scope.paper.chargeAuthor.authorName = person.name;
            $scope.paper.chargeAuthor.authorID = person.id;
        }
        $scope.transAuthor = function(person) {
            $scope.currAuthor.id = person.id;
            $scope.currAuthor.name = person.name;
        }
        $scope.nextPage = function() {
            $scope.authors = [];
            if($scope.isfauthor || $scope.isCauthor){
                if($scope.isfauthor){
                    var fAuthor = {
                        name:$scope.paper.chargeAuthor.authorName,
                        id:$scope.paper.chargeAuthor.authorID,
                        station:"1"
                    };
                    if(!myContains($scope.authors,fAuthor)){
                        $scope.authors.push(fAuthor);
                    }
                }
                if($scope.isCauthor) {
                    var cAuthor = {
                        name:JSON.parse($cookies.user).userName,
                        id:JSON.parse($cookies.user).userID,
                        station:"0"
                    };
                    if(!myContains($scope.authors,cAuthor)){
                        $scope.authors.push(cAuthor);
                    }
                }
            }else {
                $scope.authors = [];
            }
            $scope.firstPage = !$scope.firstPage;
        }
        $scope.delAuthor = function(idx){
            $scope.authors.splice(idx,1);
        }
        $scope.addAuthor = function(myAuthor){
console.log($scope.authors);
            if(!myContains($scope.authors,myAuthor)){
                $scope.authors.push(myAuthor);
console.log($scope.currAuthor);
                $scope.currAuthor = {};
            }else {
                alert("位置冲突");
            }
        }
    });