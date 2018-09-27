
exports.port = 4200;

// or if you want to use MongoDB
 exports.db = {
   url: 'mongodb://rcdb9:rcdb1234@211.87.224.168:50107/',
   host: '211.87.224.168',
   port: '50107',
   DBName: 'CrowsourcingCloud',
    name:'CrowsourcingCloud',
   userCollection: 'users',  // collection name for MongoDB
   teamCollection: 'team',
   projectCollection: 'project',
   subProjectCollection: 'subProject',
   templateCollection: 'template'
 };

 exports.secretOrPrivateKey = 'RESTFULAPIs';

 exports.secretOrPrivateKeyOfTeam = 'RESTFULAPIsTeam';

exports.queryInterval = 60000;