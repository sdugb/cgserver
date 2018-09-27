
 /**
 * Module dependencies
 */

'use strict';

var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),

  Team = require('./api/models/teamModel'),
  User = require('./api/models/userModel'),
  Project = require('./api/models/projectModel'),
  SubPorject = require('./api/models/subProjectModel'),
  Template = require('./api/models/templateModel'),

  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

var config = require('./config.js');

//连接数据库
var url = config.db.url + config.db.DBName + '?authSource=admin';
console.log('url =', url);
mongoose.connect(url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//app.use(bodyParser.urlencoded({"limit":"10000kb"}));


app.set('port', config.port);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//var CGServer = require('./CGServer.js');
//var cgServer = new CGServer(config);
//app.use(cgServer.router);

app.use(function(req, res, next) {   
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        var token = req.headers.authorization.split(' ')[1];
        //console.log('token =', token);
        jsonwebtoken.verify(token, config.secretOrPrivateKey, function(err, decode) {
            req.user = decode;
            //console.log('decode =', decode);
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});
/*
var date = new Date();
setInterval(function() {
    Team.find({isKeepLive: true}, function(err, teams) {
        if (err) console.log(err);
        var nowDate = new Date();
        for (team in teams) {
           if (nowDate - team.teamLiveDate > config.heartBeatInterval + 10000) {
              console.log('teamName =', team.name, team.teamLiveDate);
              Team.find({name: team.name}, { $set: {isKeepLive: false}},function(err, team1) {
                  if (err) console.log(err);
              });
           }
        }
    });
}, config.queryInterval);
*/
var routes = require('./routes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

/**
 * Start Server
 */

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


