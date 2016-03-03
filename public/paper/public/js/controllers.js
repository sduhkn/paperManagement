/**
 * Created by Administrator on 2015/10/28.
 * angular paperController
 */
angular.module('myApp.controllers')
    .controller('showMyPaperController', function ($scope, $state, $window, paperService) {
        /*showMyPaper.html controller*/
        paperService.getMyPaper()
            .success(function (data) {
                if (data.paperInfo.length != 0) {
                    $scope.paperInfo = data.paperInfo;
                } else {
                    $scope.errMsg = "该用户未发表文章";
                }
            }).error(function () {
            $scope.errMsg = "服务器出错";
        });

        $scope.getReference = function (paper) {
            $scope.reference = paper;
            paperService.getAuthorByPaperID(paper.paperid)
                .success(function (data) {
                    $scope.reference.authors = data.authors;
                }).error(function () {
                console.log('getAuthor error')
            })
        }
        $scope.deletePaper = function (paperid) {
            if (confirm("确定要删除这篇论文吗？")) {
                paperService.deletePaper(paperid)
                    .success(function (data, status) {
                        alert("删除成功");
                        $state.reload('stu.showMyPaper');
                    })
                    .error(function (data, status) {
                        alert("删除失败");
                    });
            }
        }
        $scope.queryMyPaper = function () {
            var date = new Date();
            var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            var queryInfo = {
                title: $scope.queryTitle || '',
                publish: $scope.queryPublish || '',
                startDate: $scope.queryStartDate || '',
                endDate: $scope.queryEndDate || currentDate
            };
            paperService.queryMyPaper(queryInfo)
                .success(function (data) {
                    if (data.paperInfo.length != 0) {
                        $scope.paperInfo = data.paperInfo;
                    } else {
                        $scope.paperInfo = null;
                        $scope.msg = "查询结果为空";
                    }
                })
                .error(function () {
                    $scope.errMsg = "服务器出错";
                });
        }
    })
    .controller('stu_showAllPaperInfoController', function ($scope, paperService) {
        $scope.paginationConf = {
            currentPage: 1,
            totalPage: 1, //总页数
            itemsPerPage: 10, //每页项数
            pagerSize: 5//显示的页码个数
        };
        $scope.load = function () {
            paperService.getAllPaperInfo($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage)
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
    .controller('showPaperController', function ($scope, $stateParams, paperService) {
        $scope.authors = [];
        $scope.preProcess = function () {
            paperService.getIncluded()
                .success(function (data) {
                    $scope.included = data.codeInfo;
                    for (var i = 0; i < $scope.included.length; i++) {
                        if ($scope.paper.included == $scope.included[i].codeid) {
                            $scope.paper.included = $scope.included[i].content;
                        }
                    }
                }).error(function () {
                console.log("included 获取失败")
            });
            paperService.getCurrency()
                .success(function (data) {
                    $scope.currency = data.codeInfo;
                    for (var i = 0; i < $scope.currency.length; i++) {
                        if ($scope.paper.currency == $scope.currency[i].codeid) {
                            $scope.paper.currency = $scope.currency[i].content;
                        }
                    }
                }).error(function () {
                console.log("currency 获取失败")
            });
            paperService.getModeOfPayment()
                .success(function (data) {
                    $scope.modeofpayment = data.codeInfo;
                    for (var i = 0; i < $scope.modeofpayment.length; i++) {
                        if ($scope.paper.modeofpayment == $scope.modeofpayment[i].codeid) {
                            $scope.paper.modeofpayment = $scope.modeofpayment[i].content;
                        }
                    }
                }).error(function () {
                console.log("modeofpayment 获取失败")
            });
        }

        paperService.getPaperAuthorByID($stateParams.paperid)
            .success(function (data) {
                $scope.paper = data.paperInfo;
                $scope.authors = data.authors;
                $scope.preProcess();
                $scope.paper.pubdate = data.paperInfo.pubdate.substring(0, 10);
                $scope.paper.paymentDate = data.paperInfo.paymentDate.substring(0, 10);
            }).error(function () {
            alert("出错了");
        });

    })
    .controller('editPaperController', function ($scope, $state, $stateParams, paperService, userService) {
            $scope.authors = [];
            $scope.editYourself = true;
            $scope.transCon_JouInfo = function (conInfo) {
                $scope.paper.publish = conInfo.cjname || '';
                $scope.paper.pubabb = conInfo.abbname || '';
                $scope.paper.included = conInfo.included || '2';
                $scope.paper.factor = conInfo.factor || 0;
                $scope.paper.isccf = conInfo.isccf || '';
                $scope.paper.ccflevel = conInfo.ccflevel || '';
                $scope.paper.isconference = conInfo.isconference;
            }
            var myContains = function (a, obj) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].station === obj.station) {
                        return true;
                    }
                }
                return false;
            }
            /*加载页面前预处理*/
            $scope.preProcess = function () {
                paperService.getPaperAuthorByID($stateParams.paperid)
                    .success(function (data) {
                        $scope.paper = data.paperInfo;
                        $scope.authors = data.authors;
                        $scope.paper.pubdate = data.paperInfo.pubdate.substring(0, 10);
                        $scope.paper.paymentDate = data.paperInfo.paymentDate.substring(0, 10);
                    }).error(function () {
                    alert("出错了");
                });
                paperService.getCon_JouInfo()
                    .success(function (data) {
                        $scope.con_jouInfos = data.con_jouInfo;
                    }).error(function () {
                    console.log("con_jouInfo 获取失败")
                });
                paperService.getIncluded()
                    .success(function (data) {
                        $scope.included = data.codeInfo;
                    }).error(function () {
                    console.log("included 获取失败")
                });
                paperService.getCurrency()
                    .success(function (data) {
                        $scope.currency = data.codeInfo;
                    }).error(function () {
                    console.log("currency 获取失败")
                });
                paperService.getModeOfPayment()
                    .success(function (data) {
                        $scope.modeofpayment = data.codeInfo;
                    }).error(function () {
                    console.log("modeofpayment 获取失败")
                });
            };
            $scope.preProcess();

            $scope.addPaper = function (paper, authors) {

                if (confirm("确定要修改这篇论文吗？")) {
                    paper.isccf = paper.ccflevel ? '1' : '2';
                    for (var i = 0; i < authors.length; i++) {
                        if (authors[i].station == '0') {
                            paper.cauthor = authors[i].authorname;
                        }
                        if (authors[i].station == '1') {
                            paper.fauthor = authors[i].authorname;
                        }
                    }
                    paperService.addPaper(paper, authors)
                        .success(function (data, status) {
                            alert("添加成功");
                            $state.go('stu.showMyPaper');
                        }).error(function () {
                        alert('添加失败');
                    });
                }

            };

            /*获取所有人员的信息  供人员选择*/
            $scope.queryUserInfoByNameOrID = function (users) {
                if (users.name || users.id) {
                    if (!users.name) {
                        users.name = '';
                    }
                    if (!users.id) {
                        users.id = '';
                    }
                    userService.queryUserInfoByNameOrID(users)
                        .success(function (data) {
                            if (data.userList.length != 0) {
                                $scope.userList = data.userList;
                            } else {
                                $scope.errorMsg = "无用户信息";
                            }
                        }).error(function () {
                        $scope.errorMsg = "服务器出错";
                    });
                }
            };
            $scope.currAuthor = {};
            $scope.transAuthor = function (person) {
                $scope.currAuthor.authorid = person.id;
                $scope.currAuthor.authorname = person.name;
            };

            $scope.nextPage = function () {
                if ($scope.paper.issue.length > 2 || $scope.paper.column.length > 2)
                    alert('期刊卷期不能多于两个字符');
                else {
                    $scope.firstPage = !$scope.firstPage;
                }
            }
            ;
            $scope.delAuthor = function (idx) {
                $scope.authors.splice(idx, 1);
            };
            $scope.addAuthor = function (myAuthor) {
                if (!myContains($scope.authors, myAuthor)) {
                    $scope.authors.push(myAuthor);
                    $scope.currAuthor = {};
                } else {
                    alert("位置冲突");
                }
            };
        }
    )
    .controller("addPaperController", function ($scope, $cookies, $state, paperService, userService) {
        var myContains = function (a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i].station === obj.station) {
                    return true;
                }
            }
            return false;
        }
        $scope.editYourself = false;
        $scope.authors = [];//存放所有作者信息
        $scope.paper = {
            included: '1',
            isconference: '1',
            isccf: '2',
            chargeAuthorInfo: {
                authorname: angular.fromJson($cookies.user).name,
                authorid: angular.fromJson($cookies.user).id
            },
            isfistSDU: '1',//第一位是否为山大
            currency: '1',//币种
            modeofpayment: '1'//支付方式
        };
        $scope.transCon_JouInfo = function (conInfo) {
            $scope.paper.publish = conInfo.cjname || '';
            $scope.paper.pubabb = conInfo.abbname || '';
            $scope.paper.included = conInfo.included || '2';
            $scope.paper.factor = conInfo.factor || 0;
            $scope.paper.isccf = conInfo.isccf || '';
            $scope.paper.ccflevel = conInfo.ccflevel || '';
            $scope.paper.isconference = conInfo.isconference;
        }
        /*加载页面前预处理*/
        $scope.preProcess = function () {
            paperService.getCon_JouInfo()
                .success(function (data) {
                    $scope.con_jouInfos = data.con_jouInfo;
                }).error(function () {
                console.log("con_jouInfo 获取失败")
            });
            paperService.getIncluded()
                .success(function (data) {
                    $scope.included = data.codeInfo;
                }).error(function () {
                console.log("included 获取失败")
            });
            paperService.getCurrency()
                .success(function (data) {
                    $scope.currency = data.codeInfo;
                }).error(function () {
                console.log("currency 获取失败")
            });
            paperService.getModeOfPayment()
                .success(function (data) {
                    $scope.modeofpayment = data.codeInfo;
                }).error(function () {
                console.log("modeofpayment 获取失败")
            });

        };
        $scope.preProcess();
        $scope.addPaper = function (paper, authors) {
            if (confirm("确定要添加论文？")) {
                paper.isccf = paper.ccflevel ? '1' : '2';
                /*paper.chargeAuthor = paper.chargeAuthorInfo.authorName;*/
                for (var i = 0; i < authors.length; i++) {
                    if (authors[i].station == '0') {
                        paper.cauthor = authors[i].authorname;
                    }
                    if (authors[i].station == '1') {
                        paper.fauthor = authors[i].authorname;
                    }
                }
                paperService.addPaper(paper, authors)
                    .success(function (data, status) {
                        alert("添加成功");
                        $state.go('stu.showMyPaper');
                    }).error(function () {
                    alert('添加失败');
                });
            }
        };

        /*获取所有人员的信息  供人员选择*/
        $scope.queryUserInfoByNameOrID = function (users) {
            if (users.name || users.id) {
                if (!users.name) {
                    users.name = '';
                }
                if (!users.id) {
                    users.id = '';
                }
                userService.queryUserInfoByNameOrID(users)
                    .success(function (data) {
                        if (data.userList.length != 0) {
                            $scope.userList = data.userList;
                        } else {
                            $scope.errorMsg = "无用户信息";
                        }
                    }).error(function () {
                    $scope.errorMsg = "服务器出错";
                });
            }
        };
        $scope.currAuthor = {};
        $scope.transAuthor = function (person) {
            $scope.currAuthor.authorid = person.id;
            $scope.currAuthor.authorname = person.name;
        }

        $scope.nextPage = function () {
            $scope.authors = [];
            if ($scope.isfauthor || $scope.isCauthor) {
                if ($scope.isfauthor) {
                    var fAuthor = {
                        authorname: $scope.paper.chargeAuthorInfo.authorname,
                        authorid: $scope.paper.chargeAuthorInfo.authorid,
                        station: "1"
                    };
                    if (!myContains($scope.authors, fAuthor)) {
                        $scope.authors.push(fAuthor);
                    }
                }
                if ($scope.isCauthor) {
                    var cAuthor = {
                        authorname: $scope.paper.chargeAuthorInfo.authorname,
                        authorid: $scope.paper.chargeAuthorInfo.authorid,
                        station: "0"
                    };
                    if (!myContains($scope.authors, cAuthor)) {
                        $scope.authors.push(cAuthor);
                    }
                }
            } else {
                $scope.authors = [];
            }
            $scope.firstPage = !$scope.firstPage;
        };
        $scope.delAuthor = function (idx) {
            $scope.authors.splice(idx, 1);
        };
        $scope.addAuthor = function (myAuthor) {
            if (!myContains($scope.authors, myAuthor)) {
                $scope.authors.push(myAuthor);
                $scope.currAuthor = {};
            } else {
                alert("位置冲突");
            }
        }
    });