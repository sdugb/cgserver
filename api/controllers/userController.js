  'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
	  bcrypt = require('bcrypt'),
	  User = mongoose.model('User'),
    Team = mongoose.model('Team');
var config = require('../../config.js')

exports.register = function(req, res) {
	 var newUser = new User(req.body);
  	newUser.password = bcrypt.hashSync(req.body.password, 10);
    if (newUser.role == 'admin')
        newUser.enable = true;
  	newUser.save(function(err, user) {
    	if (err) {
      		return res.json({ status: 1, message: err});
    	} else {
      		user.password = undefined;
      		return res.json({status: 0, user: user});
    	}
  	});
};

exports.login = function(req, res) {
  console.log(req.body);
  if (req.body.team == undefined || req.body.team == '')
      login1(req, res);
  else
      login2(req, res);
}

var login1 = function(req, res) {
  var username = req.body.username;
  var password = req.body.password; 
  var result;
  var token;
  var user;

  User.findOne({username: username}, function(err, user) {
      if (err) throw err;
      if (!user) 
          return res.json({ status: 1, message: 'Authentication failed. User not found.' });
      if (!user.comparePassword(req.body.password)) 
          return res.json({ status: 1, message: 'Authentication failed. Wrong password.' }); 
      if (user.role == 'manager' || user.role == 'designer')
          return res.json({ status: 1, message: 'Authentication failed. Wrong Role.' });
      sendSingleToken(user, res);    
  })
};

var login2 = function(req, res) {
  var username = req.body.username;
  var password = req.body.password; 
  var teamName = req.body.team;
  var result;
  var token, teamToken;
  var user, team;

  User.findOne({username: username}, function(err, user) {
      if (err) console.log('error =', err);
      
      if (!user) 
          return res.json({ status: 1, message: 'Authentication failed. User not found.' });
        
      if (!user.comparePassword(req.body.password)) 
          return res.json({ status: 1, message: 'Authentication failed. Wrong password.' }); 

      if (user.role == 'admin') {
          Team.findOne({name: teamName}, function(err1, team) {
              if (!team) 
                  return res.json({ status: 1, message: 'Authentication failed. Team not found.' });
              if (team.apiKey == undefined || team.apiKey == '')
                  return res.json({ status: 1, message: 'Authentication failed. Team ApiKey not found.' });
              sendMultiToken(user, team, res);
          });
      } else if (user.role == 'manager' || user.role == 'designer') {
        console.log(user);
          if (user.team != teamName) 
              return res.json({ status: 1, message: 'Authentication failed. Wrong Team.' });
          Team.findOne({name: teamName}, function(err1, team) {
              if (!team) 
                  return res.json({ status: 1, message: 'Authentication failed. Team not found.' });
          
              if (team.apiKey == undefined || team.apiKey == '')
                  return res.json({ status: 1, message: 'Authentication failed. Team ApiKey not found.' });
              
              sendMultiToken(user, team, res);
          }); 
      } else if (user.role == 'super') {
          Team.findOne({name: teamName}, function(err1, team) {
              if (!team) 
                  return res.json({ status: 1, message: 'Authentication failed. Team not found.' });
              if (team.apiKey == undefined || team.apiKey == '')
                  return res.json({ status: 1, message: 'Authentication failed. Team ApiKey not found.' });
              sendMultiToken(user, team, res);
          });
      }
  });
};

var sendSingleToken = function(user, res) {
  var token = jwt.sign({ _id: user._id,
                              expiresIn: 60*60*24,  // 24小时过期
                              username: user.username,
                              role: user.role}, config.secretOrPrivateKey);
  var result = { status: 0, token: token, user:{username: user.username,
                                        alias: user.alias,
                                        role: user.role,
                                        team: user.team,
                                        enable: user.enable}};
  //console.log('result =', result);
  return res.json(result);
}

var sendMultiToken = function(user, team, res) {
  var token = jwt.sign({ _id: user._id,
                              expiresIn: 60*60*24,  // 24小时过期
                              username: user.username,
                              role: user.role}, config.secretOrPrivateKey);
  var teamToken = jwt.sign({ _id: user._id,
                              expiresIn: 60*60*24,  // 24小时过期
                              username: user.username,
                              role: user.role}, team.apiKey);

  var result = { status: 0, token: token, teamToken: teamToken, user:{username: user.username,
                                                        alias: user.alias,
                                                        role: user.role,
                                                        team: user.team,
                                                        enable: user.enable},
                                                    team: {name: team.name,
                                                        alias: team.alias,
                                                        url: team.url,
                                                        apiUrl: team.apiUrl,
                                                        mongoDBUrl_Out: team.mongoDBUrl_Out,
                                                        mongoDBUser: team.mongoDBUser,
                                                        mongoDBPassword: team.mongoDBPassword,
                                                        mongoDBName: team.mongoDBName,
                                                        mongoFileDBName: team.mongoFileDBName,
                                                        mongoFileDBUser: team.mongoFileDBUser,
                                                        mongoFileDBPassword: team.mongoFileDBPassword}};
  //console.log('result =', result);
  return res.json(result);
};

exports.loginRequired = function(req, res, next) {
  //console.log('user =', req.user);
	if (req.user) {
    	next();
  	} else {
    	return res.json({ status: 1, message: 'Unauthorized user!' });
  	}
};

exports.getUserInfo = function(req, res) {
    var userName = req.body['userName'];
    User.find({username: username}, function(err, user) {
        if (err)
            return res.send(err);
        return res.json(user);
    });
};

exports.getAllUsers = function(req, res) {
    User.find({}, function(err, users) {
        if (err)
            return res.send(err);
        return res.json(users);
    });
};

exports.getTeamMember = function(req, res) {
    var team = req.body['team'];
    User.find({team: team}, function(err, users) {
        if (err)
            return res.send(err);
        return res.json(users);
    });
};

exports.setUserInfo = function(req, res) {
    var id = req.body['id'];
    var user_id = mongoose.Types.ObjectId(id); 
    var role = req.body['role'];
    var alias = req.body['alias'];
    var team = req.body['team'];
    var enable = req.body['enable'];

    User.update({"_id" : user_id}, {$set: {'role': role, 'alias': alias, 'team': team, 'enable': enable}}, function(err, users) {
        if (err)
            return res.send(err);
        return res.json(users);
    });
};

exports.modifyPassword = function(req, res) {
    var user = req.body['user'];
    var team = req.body['team'];
    var pass1 = req.body['pass1'];
    var pass2 = req.body['pass2'];

    User.findOne({username: user}, function(err, user) {
        if (err) console.log('error =', err);
        if (!user) 
            return res.json({ status: 1, message: 'Authentication failed. User not found.' });
        if (!user.comparePassword(pass1)) 
            return res.json({ status: 1, message: 'Authentication failed. Wrong password.' }); 
        var pass = bcrypt.hashSync(pass2, 10)
        User.update({username : user}, {$set: {password: pass}}, function(err, users) {
            if (err)
                return res.json({ status: 1, message: err });
            return res.json({ status: 0, user: users });
        });
  });
};
