/**
 * Created by Administrator on 2015/12/27.
 */
angular.module('myApp.services')
    .factory('projectService', function ($http) {
        this.getProjectType = function () {
            return $http.get('/codeInfo/getCodeInfo', {
                params: {
                    code: 'projecttype'
                }
            });
        };
        this.addProject = function (project) {
            return $http.post('/addProject', {
                project: project
            })
        };
        this.editProject = function (project) {
            return $http.post('/editProject/:projectid', {
                project: project
            })
        };
        this.editProjectPaper = function (projectid, papers) {
            return $http.post('/editProjectPaper/' + projectid, {
                papers: papers
            })
        };
        this.getMyProject = function (projectcharge) {
            return $http.get('/myProject');
        };
        this.deleteProject = function (projectid) {
            return $http.delete('/deleteProject/' + projectid);
        };
        this.getProjectByID = function (projectid) {
            return $http.get('/project/' + projectid);
        };

        this.getPaperByProjectId = function (projectid) {
            return $http.get('/getPaperByProjectId/' + projectid);
        };
        return this;
    });