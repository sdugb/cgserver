
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../config.js');

var TeamSchema = new Schema({
    name: { type: String, unique: true, required: true },
    user: { type: String, default: ''},
    alias: { type: String, default: ''},
    scale: { type: String, default: ''},
    isKeepLive: { type: Boolean, default: false},
    teamLiveDate: { type: Date, default: null},
    host: { type: String, default: '211.87.224.230'},
    WWWPort: { type: String, defualt: ''},
    url: { type: String, default: 'http://211.87.224.168:6002'},
    apiUrl: { type: String, default: 'http://211.87.224.230:3600'},
    apiKey: { type: String, default: ''},
    sshPort: { type: Number, default: 22},
    sshUser: { type: String, default: ''},
    sshPassword: { type: String, default: ''},
    storageDir: {type: String, default: '/opt'},
    mongoDBInPort: {type: String, default: '27017'},
    mongoDBOutPort: {type: String, default: '50107'},
    mongoDBUrl_Out: { type: String, default: ''},
    mongoDBUrl_In: { type: String, default: 'gbmongo:27017'},
    mongoDBUser: { type: String, default: 'admin'},
    mongoDBPassword: { type: String, default: 'gbzz01'},
    mongoDBName: { type: String, default: ''},
    mongoFileDBName: { type: String, default: ''},
    mongoFileDBUser: { type: String, default: 'admingridfs'},
    mongoFileDBPassword: { type: String, default: ''},
    date: { type: Date, default: Date.now}
}, { collection: config.db.teamCollection });

module.exports = mongoose.model('Team', TeamSchema);
