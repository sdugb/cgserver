'use strict';

var mongoose = require('mongoose'),
    Template = mongoose.model('Templates');

exports.createTemplate = function(req, res) {
    var newTemplate = new Template(req.body);
    newTemplate.save(function(err, template) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(template);
        }
    });
};

exports.getAllTemplates = function(req, res) {
    Template.find({}, function(err, templates) {
        if (err)
            return res.send(err);
        return res.json(templates);
    });
};

exports.getMyTemplates = function(req, res) {
    var user = req.body['user'];
    Template.find({user: user, enable: true}, function(err, templates) {
        if (err)
            return res.send(err);
        return res.json(templates);
    });
};

exports.getAllTemplates = function(req, res) {
    Template.find({}, function(err, templates) {
        if (err)
            return res.send(err);
        return res.json(templates);
    });
};

exports.setTemplate = function(req, res) {
    var name = req.body['name'];
    Template.update({name: name}, {$set: {stage: stage}}, function(err, templates) {
        if (err)
            return res.send(err);
        return res.json(templates);
    });
};
