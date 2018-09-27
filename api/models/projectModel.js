'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../config.js');

var projectSchema = new Schema({
    name: { type: String, unique: true, required: true },
    user: { type: String, required: true },
    alias: { type: String, default: ''},
    designTool: { type: String, default: 'maya2016'},
    render: { type: String, default: 'redshift'},
    timeUnit: { type: String, default: 'pal:25fps'},
    xResolution: { type: Number, default: 1920},
    yResolution: { type: Number, default: 1280},
    enable: { type: Boolean, default: true},
    date: { type: Date, default: Date.now}
}, { collection: config.db.projectCollection });

module.exports = mongoose.model('Projects', projectSchema);
