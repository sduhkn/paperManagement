/**
 * Created by Administrator on 2015/12/23.
 */
var client = require('../../../config/DB/DBConnect');
var moment = require('moment');

function Project(project){
    this.projectid = project.projectid || moment(new Date()).format('YYYYMMDDHHmmss');
    this.projectname = project.projectname || '';
    this.projectlabel = project.projectlabel || '';//项目英文标注名称
    this.projectidfin = project.projectidfin || '';//项目财务编号
    this.projecttype = project.projecttype || '';
    this.estdate = project.estdate || '0000-00-00';
    this.knotdate = project.knotdate || '0000-00-00';
    this.funding = project.funding || 0 ;
    this.projectchargeid = project.projectchargeid || '';
    this.projectchargename = project.projectchargename || '';
    this.papernum = project.papernum || 0 ;//项目需要论文数量
    this.papercomment = project.papercomment || '';//项目需要论文说明
    this.patentnum = project.patentnum || 0;
    this.copyrightnum = project.copyrightnum || 0;
    this.others = project.others || '' ; //项目验收需要的其他条件
    this.lpapernum = project.lpapernum || 0;//项目已经标注论文数量
    this.lpatentnum = project.lpatentnum || 0;//项目已标注专利数量
    this.lcopyrightnum = project.lcopyrightnum || 0;//项目已标注软件著作权数量
    this.isend = project.isend || '2';//项目是否结束
    this.comment  = project.comment ;//项目备注
}

module.exports = Project;

Project.prototype.save = function save(callback) {
    var sql = "replace into project_info values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var params = [
        this.projectid,this.projectname,this.projectlabel,this.projectidfin,this.projecttype,this.estdate,this.knotdate,
        this.funding, this.projectchargeid,this.projectchargename,this.papernum, this.papercomment,this.patentnum,
        this.copyrightnum, this.others,this.lpapernum, this.lpatentnum, this.lcopyrightnum, this.isend, this.comment];
    client.getDbConParams(sql, params, function(err, result){
        if(err){ console.log(err); }
        else {
            console.log("Paper.prototype.save result:"+result);
            callback(err, result);
        }
    });
}

Project.prototype.getProjectByID = function getProject(callback) {
    var sql = "select * from project_info where projectid =" + this.projectid;
    client.getDbCon(sql, function(err, result){
        if(err) { console.log(err); }
        else{
            callback(err, result);
        }
    })
}

Project.prototype.getMyProject = function(callback) {
    var sql = "select * from project_info where projectchargeid =" + this.projectchargeid;
    client.getDbCon(sql, function(err, result){
        if(err) { console.log(err); }
        else{
            callback(err, result);
        }
    })
}