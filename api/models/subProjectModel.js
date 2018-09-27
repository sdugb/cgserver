'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../config.js');

var subProjectSchema = new Schema({
    name: { type: String, unique: true, required: true },
    user: { type: String, required: true },
    project: { type: String, default: ''},
    team: { type: String, default: ''},
    templateName: { type: String, default: ''},
    templateStage: { type: String, default: ''},
    designTool: { type: String, default: 'maya2016'},
    render: { type: String, default: 'redshift'},
    timeUnit: { type: String, default: 'pal:25fps'},
    xResolution: { type: Number, default: 1920},
    yResolution: { type: Number, default: 1280},
    enable: { type: Boolean, default: true},
    date: { type: Date, default: Date.now}
}, { collection: config.db.subProjectCollection });

module.exports = mongoose.model('SubProjects', subProjectSchema);
