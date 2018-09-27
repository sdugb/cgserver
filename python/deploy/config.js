
exports.teamName='newsight'; //RC-Team
exports.port = 3600

exports.myRootURL = "http://211.87.224.168:4200";

exports.wxProxyHost = '58.215.62.131';
exports.wxProxyPort = 2202;
exports.wxProxyUser = 'root';
exports.wxProxyPassword = '123456';
exports.wxClient;

//Deadline Render Cluster Server
exports.DLClusterURL = 'http://211.87.224.189:8080';

exports.RenderInputRootDir = '/mnt/RenderData/RD/';
exports.RenderOutputRootDir = 'O:/RD/';

exports.wxRenderHost = '41.0.0.188';
exports.wxRenderUser = 'swsdu';
exports.wxRenderTmpRootDir = '/tmp/';
exports.wxRenderRootDir = '/home/export/online1/systest/swsdu/gb/'
exports.wxRenderInputRootDir = '/home/export/online1/systest/swsdu/gb/input/';
exports.wxRenderOutputRootDir = '/home/export/online1/systest/swsdu/gb//output/';

exports.RenderFtpRootDir = 'O:/RD/'

exports.tempDir = '/tmp/'

exports.razuna_Texture_Dir = 'texture'
exports.razuna_Submit_Dir = 'submitFile'
exports.razuna_Return_Dir = 'returnFile'
exports.razuna_Light_Dir = 'LightDir'
exports.razuna_Shot_Dir = 'ShotDir'
exports.razuna_Audio_Dir = 'AudioDir'

exports.ChatHostIP = '211.87.224.168'
exports.ChatPort1 = '9009'
exports.ChatPort2 = '9010'

//  30 seconds
exports.MonitorInterval = 60; 
exports.timer;


// or if you want to use MongoDB
 exports.teamDB = {
   url: '',
   host: '',
   port: '',
   name: '',
   projectCollection: 'project',
   subProjectCollection: 'subProject',
   templateCollection: 'template',
   taskCollection: 'task',
   logCollection: 'userActionLog',
   renderTaskCollection: "renderTask"
 };


 exports.apiKey = '';

 exports.teamInfo;

 exports.userToken;

 exports.Url;
 exports.fileUrl;

 exports.db;
 exports.filedb;
