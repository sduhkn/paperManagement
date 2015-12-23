/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController', function ($rootScope, $scope, $cookies, $state) {
        $scope.user = JSON.parse($cookies.user).name;
        $scope.$state = $state;
    })
    .controller('stu_showPaperInfoController', function ($scope, $state, $window, stuService) {
        /*showMyPaper.html controller*/
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 8000,
            totalPage:1,
            itemsPerPage: 15,
            pagesLength: 8,
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
    .controller('showPaperController',function($scope, $stateParams, stuService) {
        $scope.authors = [];
        $scope.preProcess = function(){
            stuService.getIncluded()
                .success(function(data){
                    $scope.included = data.codeInfo;
                    for(var i = 0;i<$scope.included.length;i++){
                        if($scope.paper.included == $scope.included[i].codeid){
                            $scope.paper.included = $scope.included[i].content;
                        }
                    }
                }).error(function(){ console.log("included 获取失败") });
            stuService.getCurrency()
                .success(function(data){
                    $scope.currency = data.codeInfo;
                    for(var i = 0;i<$scope.currency.length;i++){
                        if($scope.paper.currency == $scope.currency[i].codeid){
                            $scope.paper.currency = $scope.currency[i].content;
                        }
                    }
                }).error(function(){console.log("currency 获取失败")});
            stuService.getModeOfPayment()
                .success(function(data){
                    $scope.modeofpayment = data.codeInfo;
                    for(var i = 0;i<$scope.modeofpayment.length;i++){
                        if($scope.paper.modeofpayment == $scope.modeofpayment[i].codeid){
                            $scope.paper.modeofpayment = $scope.modeofpayment[i].content;
                        }
                    }
                }).error(function(){console.log("modeofpayment 获取失败")});
        }

        stuService.getPaperAuthorByID($stateParams.paperid)
            .success(function(data){
                $scope.paper = data.paperInfo;
                $scope.authors = data.authors;
                $scope.preProcess();
                $scope.paper.pubdate = data.paperInfo.pubdate.substring(0,10);
                $scope.paper.paymentDate = data.paperInfo.paymentDate.substring(0,10);
            }).error(function(){
                alert("出错了");
            });

    })
    .controller('editPaperController', function ($scope, $state, $stateParams, stuService) {
        $scope.authors = [];
        var myContains = function(a, obj) {
            for(var i = 0; i < a.length; i++) {
                if(a[i].station === obj.station){
                    return true;
                }
            }
            return false;
        }
        /*加载页面前预处理*/
        $scope.preProcess = function(){
            stuService.getPaperAuthorByID($stateParams.paperid)
                .success(function(data){
                    $scope.paper = data.paperInfo;
                    $scope.authors = data.authors;
                    $scope.paper.pubdate = data.paperInfo.pubdate.substring(0,10);
                    $scope.paper.paymentDate = data.paperInfo.paymentDate.substring(0,10);
                }).error(function(){
                    alert("出错了");
                });
            stuService.getIncluded()
                .success(function(data){
                    $scope.included = data.codeInfo;
                }).error(function(){ console.log("included 获取失败") });
            stuService.getCurrency()
                .success(function(data){
                    $scope.currency = data.codeInfo;
                }).error(function(){console.log("currency 获取失败")});
            stuService.getModeOfPayment()
                .success(function(data){
                    $scope.modeofpayment = data.codeInfo;
                }).error(function(){console.log("modeofpayment 获取失败")});
        };
        $scope.preProcess();

        $scope.addPaper = function(paper,authors) {
            paper.isccf = paper.ccflevel ? '1' : '2';
            for(var i=0;i<authors.length;i++){
                if(authors[i].station == '0'){
                    paper.cauthor = authors[i].authorname;
                }
                if(authors[i].station == '1'){
                    paper.fauthor = authors[i].authorname;
                }
            }
            stuService.addPaper(paper,authors)
                .success(function(data, status){
                    alert("添加成功");
                    $state.go('stu.showMyPaper');
                }).error(function(){
                    alert('添加失败');
                });
        };

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


        $scope.transAuthor = function(person) {
            $scope.currAuthor.authorid = person.id;
            $scope.currAuthor.authorname = person.name;
        };

        $scope.nextPage = function() {
            $scope.firstPage = !$scope.firstPage;
        };
        $scope.delAuthor = function(idx){
            $scope.authors.splice(idx,1);
        };
        $scope.addAuthor = function(myAuthor){
            if(!myContains($scope.authors,myAuthor)){
                $scope.authors.push(myAuthor);
                $scope.currAuthor = {};
            }else {
                alert("位置冲突");
            }
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
    .controller("addPaperController", function($scope,$cookies,$state,stuService){
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
            included: '1',
            isconference : '1',
            isccf: '2',
            chargeAuthorInfo:{
                authorname: JSON.parse($cookies.user).name,
                authorid: JSON.parse($cookies.user).id,
            },
            isfistSDU: '1',//第一位是否为山大
            currency: '1',//币种
            modeofpayment: '1',//支付方式
            };

        /*加载页面前预处理*/
        $scope.preProcess = function(){
            stuService.getIncluded()
                .success(function(data){
                    $scope.included = data.codeInfo;
                }).error(function(){ console.log("included 获取失败") });
            stuService.getCurrency()
                .success(function(data){
                    $scope.currency = data.codeInfo;
                }).error(function(){console.log("currency 获取失败")});
            stuService.getModeOfPayment()
                .success(function(data){
                    $scope.modeofpayment = data.codeInfo;
                }).error(function(){console.log("modeofpayment 获取失败")});
        }
        $scope.preProcess();
        $scope.addPaper = function(paper,authors) {
            paper.isccf = paper.ccflevel ? '1' : '2';
            /*paper.chargeAuthor = paper.chargeAuthorInfo.authorName;*/
            for(var i=0;i<authors.length;i++){
                if(authors[i].station == '0'){
                    paper.cauthor = authors[i].authorname;
                }
                if(authors[i].station == '1'){
                    paper.fauthor = authors[i].authorname;
                }
            }
            stuService.addPaper(paper,authors)
                .success(function(data, status){
                    alert("添加成功");
                    $state.go('stu.showMyPaper');
                }).error(function(){
                    alert('添加失败');
                });
        };

        $scope.getVar = function(){
            $scope.paper.ccflevel = $scope.paper.ccflevel ? $scope.paper.ccflevel:'null';
            console.log("$scope.isfauthor:"+$scope.isfauthor+"\t $scope.isCauthor:"+$scope.isCauthor);
            console.log("$scope.paper.isfistSDU:"+$scope.paper.isfistSDU);
            console.log("$scope.paper.included:"+$scope.paper.included);
            console.log("$scope.paper.currency:"+$scope.paper.currency);
            console.log("$scope.paper.ccflevel:"+$scope.paper.ccflevel);
            console.log("$scope.paper.pubdate:"+Date.parse($scope.paper.pubdate));
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
        /*$scope.transUser = function(person) {
            $scope.paper.chargeAuthorInfo.authorName = person.name;
            $scope.paper.chargeAuthorInfo.authorID = person.id;
        }*/

        $scope.transAuthor = function(person) {
            $scope.currAuthor.authorid = person.id;
            $scope.currAuthor.authorname = person.name;
        }

        $scope.nextPage = function() {
            $scope.authors = [];
            if($scope.isfauthor || $scope.isCauthor){
                if($scope.isfauthor){
                    var fAuthor = {
                        authorname:$scope.paper.chargeAuthorInfo.authorname,
                        authorid:$scope.paper.chargeAuthorInfo.authorid,
                        station:"1"
                    };
                    if(!myContains($scope.authors,fAuthor)){
                        $scope.authors.push(fAuthor);
                    }
                }
                if($scope.isCauthor) {
                    var cAuthor = {
                        authorname:$scope.paper.chargeAuthorInfo.authorname,
                        authorid:$scope.paper.chargeAuthorInfo.authorid,
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
            if(!myContains($scope.authors,myAuthor)){
                $scope.authors.push(myAuthor);
                $scope.currAuthor = {};
            }else {
                alert("位置冲突");
            }
        }
    });