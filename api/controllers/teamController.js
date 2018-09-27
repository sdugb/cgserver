
'use strict';

var mongoose = require('mongoose'),
    Team = mongoose.model('Team');

var randomString = require('random-string');
var child_process = require('child_process');
var fs = require('fs');

var config = require('../../config.js');

exports.getApiKey = function(req, res, next) {
    var teamName = req.body['teamName'];
    var teamInfo = [];

    Team.findOne({name: teamName}, function(err, teamInfo) {
        if (err)
            return res.json({'status': 1, 'message': err});
        if (!teamInfo)
            return res.json({'status': 1, 'message': 'teamName is not found!!!'});
        //console.log('teamInfo =', teamInfo);
        if (teamInfo.apiKey) {
            console.log('teamName = ', teamInfo.name, teamInfo.apiKey);
            return res.json({'status': 0, 'team': teamInfo});
        } else {
            teamInfo.apiKey = randomString();
            var newTeam = new Team(teamInfo);
            newTeam.save(function(err, team) {
                if (err) {
                    console.log('error =', err);
                    return res.json({status: 1, message: err});
                } 
                return res.json({status: 0, team: team});
            });
        }
    });
};

exports.heartBeat = function(req, res, next) {
    var teamName = req.body.name;
    var cgteamDate = req.body.cgteamDate;
    var cgserverDate = req.body.cgserverDate;

    var nowDate = new Date();
    console.log('teamName =', teamName, cgserverDate);
    Team.updateOne({name: teamName}, {$set: { isKeepLive: true,
                                        teamLiveDate: nowDate}}, function(err, team) {
        return res.json({status: 1, cgteamDate: cgteamDate, cgserverDate: nowDate});
    });
};

exports.createTeam = function(req, res) {
    console.log(req.body['teamInfo']);
    var newTeam = new Team(req.body['teamInfo']);
    Team.findOne({name: newTeam.name}, function(err, team) {
        if (err) {
            console.log('error =', err);
            return res.json({ status: 1, message: err });
        }
        if (team) {
            console.log('team =', team);
            Team.updateOne({name: team.name}, {$set: {alias: newTeam.alias,
                                                    scale: newTeam.scale,
                                                    host: newTeam.host,
                                                    apiUrl: 'http://' + newTeam.host + ':3600',
                                                    storageDir: newTeam.storageDir,
                                                    sshPort: newTeam.sshPort,
                                                    sshUser: newTeam.sshUser,
                                                    sshPassword: newTeam.sshPassword}}, function(err1, team1) {
                if (err1) {
                    console.log('error =', err1);
                    return res.json({ status: 1, message: err1 });
                }
                res.json(team);
                deploy(team);
            });
        } else {
            newTeam.apiUrl = 'http://' + newTeam.host + ':3600';
            newTeam.mongoDBName = newTeam.name;
            //newTeam.mongoDBUser = 'admin';
            //newTeam.mongoDBPassword = 'gbzz01';
            newTeam.mongoDBUrl_Out =  'mongodb://' + newTeam.host + ':' + newTeam.mongoDBOutPort;
            newTeam.mongoFileDBName = newTeam.name + 'Files';
            newTeam.mongoFileDBUser = 'DBFile'
            newTeam.mongoFileDBPassword = randomString();
            newTeam.save(function(err2, team) {
                if (err2) {
                    console.log('error =', err2);
                    return res.json({ status: 1, message: err2 });
                } 
                res.json({status: 0, team: team});
                deploy(team);
            });
        }
    });
};

var deploy = function(team) {
    console.log('team =', team);
    var fileName = '/home/cgserver/JWT/tmp/' + team.name + '.json';
    console.log(fileName);
  
    var msg = JSON.stringify(team);
    //console.log('msg =', msg);

    var ret = fs.writeFileSync(fileName, msg);
  
    var serverString = 'python /home/cgserver/JWT/python/deployServer.py ' + fileName + ' ';
    console.log('string =', serverString);

    var wwwString = 'python /home/cgserver/JWT/python/deployWWW.py ' + fileName + ' ';
    console.log('string =', wwwString);

    var deployServerProcess = child_process.exec(serverString);
    
    deployServerProcess.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    deployServerProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    deployServerProcess.on('exit', function (code) {
        console.log('API and MongDB Server is deplyed');
    });

    var deployWWWProcess = child_process.exec(wwwString);
    
    deployWWWProcess.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    deployWWWProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    deployWWWProcess.on('exit', function (code) {
        console.log('WWW Server is deployed');
    });
}

exports.runTeamDocker = function(req, res) {
    var teamName = req.body["name"];
    Team.findOne({name: teamName}, function(err, team) {
        run(team, res);
    });
};

var run = function(team, res) {
    console.log('team =', team);
    var fileName = '/home/cgserver/JWT/tmp/' + team.name + '.json';
    console.log(fileName);
  
    var msg = JSON.stringify(team);
    //console.log('msg =', msg);

    var ret = fs.writeFileSync(fileName, msg);
  
    var serverString = 'python /home/cgserver/JWT/python/runServer.py ' + fileName + ' ';
    console.log('string =', serverString);

    var runServerProcess = child_process.exec(serverString);
    
    runServerProcess.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    runServerProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    runServerProcess.on('exit', function (code) {
        res.json({ status: 0})
        console.log('API and MongDB Server is deplyed');
    });
}
    
exports.getTeam = function(name) {
    console.log('name =', name);
    Team.find({name: name}, function(err, teams) {
        console.log('teams =', teams);
        return teams;
    });
};

exports.getTeamInfo = function(req, res) {
    var name = req.body['name'];
    Team.find({name: name}, function(err, teams) {
        if (err)
            return res.send(err);
        return res.json(teams);
    });
};

exports.getMyTeams = function(req, res) {
    var user = req.body['user'];
        Team.find({user: user}, function(err, teams) {
            if (err)
                return res.send(err);
            return res.json(teams);
        });
};

exports.getAllTeams = function(req, res) {
    Team.find({}, function(err, teams) {
        if (err)
            return res.send(err);
        console.log(teams.length);
        return res.json(teams);
    });
};
