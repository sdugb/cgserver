'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../config.js');

var TemplateSchema = new Schema({
    name: { type: String, unique: true, required: true },
    user: { type: String, required: true },
    alias: { type: String, default: ''},
    enable: { type: Boolean, default: true},
    stage: { type: String, default: ''},
    date: { type: Date, default: Date.now}
}, { collection: config.db.templateCollection });

module.exports = mongoose.model('Templates', TemplateSchema);