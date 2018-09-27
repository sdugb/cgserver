'use strict';

var mongoose = require('mongoose'),
    SubProject = mongoose.model('SubProjects'),
    Team = mongoose.model('Team');

var Client = require('node-rest-client').Client;

exports.createSubProject = function(req, res) {
    console.log('createSubProject');
    var newSubProject = new SubProject(req.body['subProject']);
    newSubProject.save(function(err, subProject) {
        if (err) {
            return res.json({status: 1, message: err});
        } 
        Team.findOne({name: newSubProject.team}, function(err, team) {
            var client = new Client();
            var args = {
                data: { project: newSubProject },
                headers: { "Content-Type": "application/json" }
                };
                console.log(team);
            client.post(team.apiUrl + '/cgteam/createProject', args, function (data, response) {
                if (data.status == 1)
                    return res.json({status: 1, message: '团队数据库创建项目错误'});
                else
                    return res.json({status: 0, subProject: newSubProject});     
            });
        });
    });
};

exports.getMySubProjects = function(req, res) {
    var user = req.body['user'];
    SubProject.find({user:user, enable: true}, function(err, subProjects) {
        if (err)
            return res.send(err);
        return res.json(subProjects);
    });
};

exports.getSubProjects = function(req, res) {
    var project = req.body['project'];
    SubProject.find({project: project, enable: true}, function(err, subProjects) {
        if (err)
            return res.send(err);
        return res.json(subProjects);
    });
};

exports.getAllSubProjects = function(req, res) {
    SubProject.find({}, function(err, subProjects) {
        if (err)
            return res.send(err);
        return res.json(subProjects);
    });
};


exports.getMyTeamProjects = function(req, res) {
    var teamName = req.body['teamName'];
    SubProject.find({team: teamName, enable: true}, function(err, subProjects) {
        if (err)
            return res.send(err);
        return res.json(subProjects);
    });
};