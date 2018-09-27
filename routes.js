'use strict';

module.exports = function(app) {
	var teamHandlers = require('./api/controllers/teamController.js');
	var userHandlers = require('./api/controllers/userController');
	var projectHandlers = require('./api/controllers/projectController.js');
	var subProjectHandlers = require('./api/controllers/subProjectController.js');
	var templateHandlers = require('./api/controllers/templateController.js');

	// todoList Routes
	/*
	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(userHandlers.loginRequired, todoList.create_a_task);

	app.route('/tasks/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);
*/
	app.route('/cgserver/register')
		.post(userHandlers.register);

	app.route('/cgserver/login')
		.post(userHandlers.login);


	app.route('/cgserver/getTeamMember')
		.post(userHandlers.loginRequired, userHandlers.getTeamMember);

	app.route('/cgserver/getAllUsers')
		.post(userHandlers.loginRequired, userHandlers.getAllUsers);

	app.route('/cgserver/setUserInfo')
		.post(userHandlers.loginRequired, userHandlers.setUserInfo);

	app.route('/cgserver/getUserInfo')
		.post(userHandlers.loginRequired, userHandlers.getUserInfo);
	app.route('/cgserver/modifyPassword')
		.post(userHandlers.loginRequired, userHandlers.modifyPassword);


	app.route('/cgserver/getApiKey')
		.post(teamHandlers.getApiKey);

	app.route('/cgserver/heartBeat')
		.post(teamHandlers.heartBeat);

	app.route('/cgserver/createTeam')
		.post(userHandlers.loginRequired, teamHandlers.createTeam);
		
	app.route('/cgserver/getTeamInfo')
		.post(userHandlers.loginRequired, teamHandlers.getTeamInfo);

	app.route('/cgserver/getMyteams')
		.post(userHandlers.loginRequired, teamHandlers.getMyTeams);

	app.route('/cgserver/getAllteams')
		.post(userHandlers.loginRequired, teamHandlers.getAllTeams);

	app.route('/cgserver/runTeamDocker')
		.post(userHandlers.loginRequired, teamHandlers.runTeamDocker);


	app.route('/cgserver/createProject')
		.post(userHandlers.loginRequired, projectHandlers.createProject);

	app.route('/cgserver/getMyProjects')
		.post(userHandlers.loginRequired, projectHandlers.getMyProjects);

	app.route('/cgserver/getAllProjects')
		.post(userHandlers.loginRequired, projectHandlers.getAllProjects);

	app.route('/cgserver/getProjectInfo')
		.post(userHandlers.loginRequired, projectHandlers.getProjectInfo);


	app.route('/cgserver/createSubProject')
		.post(userHandlers.loginRequired, subProjectHandlers.createSubProject);

	app.route('/cgserver/getMySubProjects')
		.post(userHandlers.loginRequired, subProjectHandlers.getMySubProjects);

	app.route('/cgserver/getSubProjects')
		.post(userHandlers.loginRequired, subProjectHandlers.getSubProjects);

	app.route('/cgserver/getAllSubProjects')
		.post(userHandlers.loginRequired, subProjectHandlers.getAllSubProjects);

	app.route('/cgserver/getMyTeamProjects')
		.post(userHandlers.loginRequired, subProjectHandlers.getMyTeamProjects);


	app.route('/cgserver/createTemplate')
		.post(userHandlers.loginRequired, templateHandlers.createTemplate);

	app.route('/cgserver/getAllTemplates')
		.post(userHandlers.loginRequired, templateHandlers.getAllTemplates);

	app.route('/cgserver/getMyTemplates')
		.post(userHandlers.loginRequired, templateHandlers.getMyTemplates);

	app.route('/cgserver/setTemplate')
		.post(userHandlers.loginRequired, templateHandlers.setTemplate);

}