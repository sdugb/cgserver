'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Projects');

exports.createProject = function(req, res) {
    console.log(req.body['project']);
    var newProject = new Project(req.body['project']);
    newProject.save(function(err, project) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(project);
        }
    });
};

exports.getMyProjects = function(req, res) {
    var user = req.body['user'];
    Project.find({user:user, enable: true}, function(err, projects) {
        if (err)
            return res.send(err);
        return res.json(projects);
    });
};

exports.getSubProjects = function(req, res) {
    var project = req.body['project'];
    Project.find({project: project, enable: true}, function(err, subProjects) {
        if (err)
            return res.send(err);
        return res.json(subProjects);
    });
};

exports.getAllProjects = function(req, res) {
    Project.find({}, function(err, projects) {
        if (err)
            return res.send(err);
        return res.json(projects);
    });
};

exports.getProjectInfo = function(req, res) {
    var projectName = req.body['projectName'];
    Project.find({name: projectName,}, function(err, projects) {
        if (err)
            return res.send(err);
        return res.json(projects);
    });
};
