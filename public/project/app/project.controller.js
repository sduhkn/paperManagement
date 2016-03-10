/**
 * Created by Administrator on 2015/12/27.
 * express project controller
 */
var Project = require('./project.model');
var client = require('../../../config/DB/DBConnect');

/*根据projectid获取project信息*/
exports.getProject = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid
    }
    var project = new Project(projectInfo);
    project.getProjectByID(function (err, result) {
        if (err) {
            return res.sendStatus(500);
        } else {
            return res.send({projectInfo: result[0]})
        }
    })
};

exports.addProject = function (req, res) {
    var project = new Project(req.body.project);
    project.save(function (err, result) {
        if (err) {
            return res.sendStatus(500);
        } else {
            if (result.affectedRows != 0) {
                return res.sendStatus(200);
            }
        }
    });
};
/*编辑project的信息*/
exports.editProject = function (req, res) {
    var project = new Project(req.body.project);
    project.save(function (err, result) {
        if (err) {
            return res.sendStatus(500);
        } else {
            if (result.affectedRows != 0) {
                return res.sendStatus(200);
            }
            return res.sendStatus(400);
        }
    });
};
/*
 * 为project添加paper标注
 * */
exports.editProjectPaper = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid
    }
    var project = new Project(projectInfo);
    project.getProjectByID(function (err, result) {
        if (err) {
            return res.sendStatus(500);
        }
        var myProjectInfo = result[0];
        myProjectInfo.papers = req.body.papers;
        var myProject = new Project(myProjectInfo);
        myProject.savePaper(function (err, result1) {
            if (err) {
                return res.sendStatus(500);
            }
        });
        return res.sendStatus(200);
    })
};

exports.getMyProject = function (req, res) {
    var projectInfo = {
        projectchargeid: req.session.user.id,
    };

    var project = new Project(projectInfo);
    project.getMyProject(function (err, projectInfo) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            res.send({
                projectInfo: projectInfo
            });
        }
    });
};
exports.getPaperByProjectId = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid
    };
    var project = new Project(projectInfo);
    project.getPaperByProjectId(function (err, papers) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            return res.send({papers: papers});
        }
    });
};
exports.deleteProject = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid
    };
    var project = new Project(projectInfo);
    project.deleteProject(function (err) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            return res.send(200);
        }
    });
};
exports.getAllProject = function (req, res) {
    //var projectInfo = {
    //    projectname: req.query.projectName,
    //    projectchargename: req.query.chargeNmae
    //}
    //console.log(projectInfo);
    //var project = new Project(projectInfo);
    //project.queryAllProject(function (err, result) {
    //    if (err) {
    //        res.sendStatus(500);
    //        console.log("服务器出错");
    //    }
    //    else {
    //        res.send({projectInfo: result});
    //    }
    //})
    var currentPage = req.query.currentPage;
    var pageSize = req.query.pageSize;
    var totalSize = 0;
    var sql_count;
    //if (req.cookies['projectCount'] && req.cookies['projectCount'] != 0) {
    //    totalSize = req.cookies['projectCount'];
    //} else {
    //    sql_count = "select count(projectid) as count from project_info";
    //    client.getDbCon(sql_count, function (err, projectCount) {
    //        if (projectCount) {
    //            res.cookie('projectCount', projectCount[0].count, {maxAge: 10 * 60 * 1000});
    //            totalSize = projectCount[0].count;
    //        }
    //    });
    //}
    sql_count = "select count(projectid) as count from project_info";
    client.getDbCon(sql_count, function (err, projectCount) {
        if (projectCount.length!=0) {
            totalSize = projectCount[0].count;
            var sql = "select * from project_info limit " + (currentPage - 1) * pageSize + "," + pageSize;
            client.getDbCon(sql, function (err, projectInfo) {
                if (projectInfo.length != 0) {
                    return res.send({
                        projectInfo: projectInfo,
                        totalSize: totalSize
                    });
                } else {
                    return res.sendStatus(401);
                }
            });
        }
    });
    //var sql = "select * from project_info limit " + (currentPage - 1) * pageSize + "," + pageSize;
    //client.getDbCon(sql, function (err, projectInfo) {
    //    if (projectInfo.length != 0) {
    //        return res.send({
    //            projectInfo: projectInfo,
    //            totalSize: totalSize
    //        });
    //    } else {
    //        return res.sendStatus(401);
    //    }
    //});
}