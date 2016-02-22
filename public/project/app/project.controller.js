/**
 * Created by Administrator on 2015/12/27.
 * express project controller
 */
var Project = require('./project.model');
var client = require('../../../config/DB/DBConnect');
var wait = require('wait.for');

exports.getProject = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid
    }
    var project = new Project(projectInfo);
    project.getProjectByID(function (err, result) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send({projectInfo: result[0]})
        }
    })
}

exports.addProject = function (req, res) {
    var project = new Project(req.body.project);
    project.save(function (err, result) {
        if (err) {
            res.sendStatus(500);
        } else {
            if (result.affectedRows != 0) {
                return res.sendStatus(200);
            }
        }
    });
}
exports.editProject = function (req, res) {
    var project = new Project(req.body.project);
    project.save(function (err, result) {
        if (err) {
            res.sendStatus(500);
        } else {
            if (result.affectedRows != 0) {
                return res.sendStatus(200);
            }
        }
    });
}

exports.editProjectPaper = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid,
        papers: req.body.papers
    }
    var project = new Project(projectInfo);
    project.savePaper(function (err, result) {
        if (err) {
            res.sendStatus(500);
        }
    });
    return res.sendStatus(200);
}

exports.getMyProject = function (req, res) {
    var projectInfo = {
        projectchargeid: req.query.projectcharge
    };

    var project = new Project(projectInfo);
    project.getMyProject(function (err, projectInfo) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.send({
                projectInfo: projectInfo
            });
        }
    });
}
exports.getPaperByID = function (req, res) {
    var projectInfo = {
        projectid: req.params.projectid
    }
    var project = new Project(projectInfo);
    project.getPaperByID(function (err, papers) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            return res.send({papers: papers});
        }
    });
}