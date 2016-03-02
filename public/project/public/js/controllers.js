/**
 * Created by Administrator on 2015/12/25.
 * angular project controller
 */
angular.module('myApp.controllers')
    .controller('showMyProjectController', function ($scope, $cookies, projectService) {
        //var projectchargeid = angular.fromJson($cookies.user).id;
        projectService.getProjectType()
            .success(function (data) {
                $scope.projectType = data.codeInfo;
            }).error(function () {
            alert('获取项目类型失败');
        });
        projectService.getMyProject()
            .success(function (data) {
                if (data.projectInfo.length != 0) {
                    $scope.projectInfo = data.projectInfo;
                } else {
                    $scope.errorMsg = "用户未有项目信息";
                    console.log($scope.errorMsg);
                }
            }).error(function () {
            $scope.errorMsg = "服务器出错";
        });
    })
    .controller('showProjectController', function ($scope, $stateParams, projectService) {
        projectService.getProjectType()
            .success(function (data) {
                $scope.projectType = data.codeInfo;
            }).error(function () {
            alert('获取项目类型失败');
        });
        projectService.getProjectByID($stateParams.projectid)
            .success(function (data) {
                $scope.project = data.projectInfo;
            })
    })
    .controller('addProjectController', function ($state, $scope, $cookies, userService, projectService) {
        /*获取所有人员的信息  供人员选择*/
        $scope.project = {
            projectchargename: angular.fromJson($cookies.user).name,
            projectchargeid: angular.fromJson($cookies.user).id
        };
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
            $scope.users = {};//清空用户输入
        };
        $scope.transProjectCharge = function (person) {
            $scope.project.projectchargeid = person.id;
            $scope.project.projectchargename = person.name;
        };

        $scope.addProject = function (project) {
            if (confirm("确定要添加项目么？")) {
                projectService.addProject(project)
                    .success(function () {
                        alert('添加成功');
                        $state.go('stu.showMyProject');
                    }).error(function () {
                    alert('服务器出错，添加失败');
                });
            }
        }
    })
    .controller('editProjectController', function ($state, $stateParams, $scope, $cookies,
                                                   userService, projectService) {
        /*获取所有人员的信息  供人员选择*/
        $scope.project = {
            projectchargename: angular.fromJson($cookies.user).name,
            projectchargeid: angular.fromJson($cookies.user).id
        };
        projectService.getProjectByID($stateParams.projectid)
            .success(function (data) {
                $scope.project = data.projectInfo;
                $scope.project.estdate = data.projectInfo.estdate.substring(0, 10);
                $scope.project.knotdate = data.projectInfo.knotdate.substring(0, 10);
            });
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
            $scope.users = {};//清空用户输入
        };
        $scope.transProjectCharge = function (person) {
            $scope.project.projectchargeid = person.id;
            $scope.project.projectchargename = person.name;
        };

        $scope.editProject = function (project) {
            if (confirm("确定要修改项目吗？")) {
                projectService.editProject(project)
                    .success(function () {
                        alert('修改成功');
                        $state.go('stu.showMyProject');
                    }).error(function () {
                    alert('服务器出错，修改失败');
                });
            }
        }
    })
    .controller('editProjectPaperController', function ($state, $stateParams, $scope, $cookies,
                                                        userService, projectService, paperService) {
        $scope.papers = {};
        var myContains = function (a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i].paperid === obj.paperid) {
                    return true;
                }
            }
            return false;
        };
        projectService.getProjectByID($stateParams.projectid)
            .success(function (data) {
                $scope.projectname = data.projectInfo.projectname;
            }).error(function () {
            alert('获取project失败')
        });
        projectService.getPaperByProjectId($stateParams.projectid)
            .success(function (data) {
                $scope.papers = data.papers;
            }).error(function () {
            alert('标注论文加载失败');
        });


        $scope.editProjectPaper = function (papers) {
            if (confirm("确定要修改项目标注么吗？")) {
                projectService.editProjectPaper($stateParams.projectid, papers)
                    .success(function () {
                        alert('修改成功');
                        $state.go('stu.showMyProject');
                    }).error(function () {
                    alert('服务器出错，修改失败');
                });
            }
        };
        $scope.delPaper = function (idx) {
            $scope.papers.splice(idx, 1);
        };

        $scope.addPaper = function (paper) {
            if (!myContains($scope.papers, paper)) {
                $scope.papers.push(paper);
            } else {
                alert("论文已添加！");
            }
        };
        $scope.queryAllPaper = function () {
            $scope.paperInfo = {};
            var date = new Date();
            var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            var queryInfo = {
                title: $scope.queryTitle || '',
                publish: $scope.queryPublish || '',
                startDate: $scope.queryStartDate || '',
                endDate: $scope.queryEndDate || currentDate
            };
            paperService.queryAllPaper(queryInfo)
                .success(function (data) {
                    if (data.paperInfo.length != 0) {
                        $scope.paperInfo = data.paperInfo;
                        console.log($scope.paperInfo);
                    } else {
                        $scope.errorMsg = "查询结果为空";
                    }
                })
                .error(function () {
                    $scope.errorMsg = "服务器出错";
                });
        }
    });