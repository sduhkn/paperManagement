/**
 * Created by Administrator on 2015/12/23.
 */
var client = require('../../../config/DB/DBConnect');
function Project(project){
    this.projectname = project.projectname || '';
    this.projectlabel = project.projectlabel || '';//��ĿӢ�ı�ע����
    this.projectidfin = project.projectidfin || '';//��Ŀ������
    this.projecttype = project.projecttype || '';
    this.estdate = project.estdate || '0000-00-00';
    this.knotdate = project.knotdate || '0000-00-00';
    this.funding = project.funding || 0 ;
    this.projectcharge = project.projectcharge || '';
    this.papernum = project.papernum || 0 ;//��Ŀ��Ҫ��������
    this.papercomment = project.papercomment || '';//��Ŀ��Ҫ����˵��
    this.patentnum = project.patentnum || 0;
    this.copyrightnum = project.copyrightnum || 0;
    this.others = project.others || '' ; //��Ŀ������Ҫ����������
    this.lpapernum = project.lpapernum || 0;//��Ŀ�Ѿ���ע��������
    this.lpatentnum = project.lpatentnum || 0;//��Ŀ�ѱ�ער������
    this.lcopyrightnum = project.lcopyrightnum || 0;//��Ŀ�ѱ�ע�������Ȩ����
    this.isend = project.isend || '2';//��Ŀ�Ƿ����
    this.comments  = project.comments ;//��Ŀ��ע
}

module.exports = Project;

Project.prototype.save = function save(callback) {
    var sql = "replace into project_info values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var params = [
        this.projectname,this.projectlabel,this.projectidfin,this.projecttype,this.estdate,this.knotdate,this.funding,
        this.projectcharge,this.papernum, this.papercomment,this.patentnum,this.copyrightnum,this.others,this.lpapernum,
        this.lpatentnum, this.lcopyrightnum, this.isend, this.comments];
    client.getDbConParams(sql, params, function(err, result){
        if(err){ throw  err }
        else {
            console.log("Paper.prototype.save result:"+result);
            callback(err, result);
        }
    });
}