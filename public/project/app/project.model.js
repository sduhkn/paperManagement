/**
 * Created by Administrator on 2015/12/23.
 */
var client = require('../../../config/DB/DBConnect');
var moment = require('moment');
var pool = client.pool;

function Project(project) {
    this.projectid = project.projectid || moment(new Date()).format('YYYYMMDDHHmmss');
    this.projectname = project.projectname || '';
    this.projectlabel = project.projectlabel || '';//项目英文标注名称
    this.projectidfin = project.projectidfin || '';//项目财务编号
    this.projecttype = project.projecttype || '';
    this.estdate = project.estdate || '0000-00-00';
    this.knotdate = project.knotdate || '0000-00-00';
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
    this.isend = project.isend || '2';//项目是否结束
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
    /*pool.getConnection(function(err, con){
        var sql_delete = "delete from pp_label where projectid="+this.projectid;
        con.beginTransaction(function(err) {
            if (err) { console.log(err); return;}
            con.query(sql_delete, function(err ,result) {
                if(err) {
                    return con.rollback(function(){
                        console.log("commit error1 \n"+ err);
                    });
                }
                con.commit(function(err) {
                    if(err) {
                        return con.rollback(function(){
                            console.log("commit error2!"+err);
                        });
                    }
                    callback(err, result);
                })
            });
        });
        con.release();
    });*/
    var projectid = this.projectid, papers = this.papers;
    var sql_delete = "delete from pp_label where projectid=" + projectid;
    var sql = "replace into pp_label(paperid, projectid) values(?,?)";

    client.getDbCon(sql_delete, function (err, result) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        for (var i = 0; i < papers.length; i++) {
            var params2 = [papers[i].paperid, projectid];
            console.log(params2);
            client.getDbConParams(sql, params2, function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                else {
                    return callback(err, result);
                }
            })
        }

    });

};
/*根据projectid获取project的信息*/
Project.prototype.getProjectByID = function getProject(callback) {
    var sql = "select * from project_info where projectid =" + this.projectid;
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    })
};
/*根据项目负责人的id获取项目信息*/
Project.prototype.getMyProject = function (callback) {
    var sql = "select * from project_info where projectchargeid =" + this.projectchargeid + " order by estdate DESC";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            callback(err, result);
        }
    })
};
/*根据projectid获取对应project标注的paper信息*/
Project.prototype.getPaperByID = function (callback) {
    var sql = "SELECT * from paper_info where paperid in (SELECT paperid FROM pp_label WHERE projectid =" + this.projectid + ")";
    client.getDbCon(sql, function (err, result) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            callback(err, result);
        }
    })
};