'use strict';

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema;
var config = require('../../config.js');

	// 定义用户模式
var UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    team: { type: String, default: ''},
    role: { type: String, default: 'designer'},
    alias: { type: String, default: ''},
    enable: { type: Boolean, default: false},
    createDate: { type: Date, default: Date.now}
}, { collection: config.db.userCollection });


UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", UserSchema);