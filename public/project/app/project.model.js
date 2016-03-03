/**
 * Created by Administrator on 2015/12/23.
 */
var client = require('../../../config/DB/DBConnect');
var moment = require('moment');
var logger = require('../../util/logHelper.js').helper;
function Project(project) {
    this.projectid = project.projectid || moment(new Date()).format('YYYYMMDDHHmmss');
    this.projectname = project.projectname || '';
    this.projectlabel = project.projectlabel || '';//项目英文标注名称
    this.projectidfin = project.projectidfin || '';//项目财务编号
    this.projecttype = project.projecttype || '';
    this.estdate = project.estdate || '0000-00-00';//开始日期
    this.knotdate = project.knotdate || '0000-00-00';//结束日期
    this.funding = project.funding || 0;
    this.projectchargeid = project.projectchargeid || '';
    this.projectchargename = project.projectchargename || '';
    this.papernum = project.papernum || 0;//项目需要论文数量
    this.papercomment = project.papercomment || '';//项目需要论文说明
    this.patentnum = project.patentnum || 0;
    this.copyrightnum = project.copyrightnum || 0;
    this.others = project.others || ''; //项目验收需要的其他条件
    this.lpapernum = project.lpapernum || 0;//项目已经标注论文数量
    this.lpatentnum = project.lpatentnum || 0;//项目已标注专利数量
    this.lcopyrightnum = project.lcopyrightnum || 0;//项目已标注软件著作权数量
    this.isend = project.isend || '2';//项目是否结束 '1'表示项目结束 '2'表示项目未结束
    this.comment = project.comment;//项目备注
    this.papers = project.papers;//项目标注论文
}

module.exports = Project;

/*保存项目信息*/
Project.prototype.save = function save(callback) {
    var sql = "replace into project_info values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var params = [
        this.projectid, this.projectname, this.projectlabel, this.projectidfin, this.projecttype, this.estdate, this.knotdate,
        this.funding, this.projectchargeid, this.projectchargename, this.papernum, this.papercomment, this.patentnum,
        this.copyrightnum, this.others, this.lpapernum, this.lpatentnum, this.lcopyrightnum, this.isend, this.comment];
    client.getDbConParams(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Paper.prototype.save result:" + result);
            callback(err, result);
        }
    });
};
/*保存项目中的标注paper信息*/
Project.prototype.savePaper = function savePaper(callback) {
    /*1. 删除pp_label表中的对应的数据
    * 2. 更新pp_label中的数据
    * 3. 更新project_info中的已标注论文的数量
    * */
    var projectid = this.projectid, papers = this.papers;
    var sql_delete = "delete from pp_label where projectid=" + projectid;
    var sql = "replace into pp_label(paperid, projectid) values(?,?)";
    if(papers.length >= this.papernum){
        //判断项目是否结束
        this.isend = "1"
    }else{
        this.isend = "2"
    }
    var sql_update = "UPDATE project_info SET lpapernum ="+ papers.length +",isend="+
        this.isend +" WHERE projectid = "+this.projectid;

    client.getDbCon(sql_delete, function (err, result) {
        if (err) {
            logger.writeErr(err);
            return callback(err, null);
        }
        for (var i = 0; i < papers.length; i++) {
            var params2 = [papers[i].paperid, projectid];
            client.getDbConParams(sql, params2, function (err, result) {
                if (err) {
                    logger.writeErr(err);
                    return callback(err, null)
                }
            })
        }
        client.getDbCon(sql_update, function(err, result){
            if(err){
                logger.writeErr(err);
                return callback(err, null)
            }
        });
        return callback(err, result)
    });

};
/*根据projectid获取project的信息*/
Project.prototype.getProjectByID = function getProject(callback) {
    var sql = "select * from project_info where projectid =" + this.projectid;
    client.getDbCon(sql, function (err, result) {
        if (err) {
            logger.writeErr(err);
            return callback(err, null)
        }
        else {
            return callback(err, result);
        }
    })
};
/*根据项目负责人的id获取项目信息*/
Project.prototype.getMyProject = function (callback) {
    var sql = "select * from project_info where projectchargeid =" + this.projectchargeid + " order by estdate DESC";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            logger.writeErr(err);
            return callback(err, null)
        }
        else {
            callback(err, result);
        }
    })
};
/*根据projectid获取对应project标注的paper信息*/
Project.prototype.getPaperByProjectId = function (callback) {
    var sql = "SELECT * from paper_info where paperid in (SELECT paperid FROM pp_label WHERE projectid =" + this.projectid + ")";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            logger.writeErr(err);
            return callback(err, null)
        }
        else {
            callback(err, result);
        }
    })
};