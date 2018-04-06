"use strict";

//const GitHub = require('github');


/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
	res.render('api/index', {
		title: 'API Examples'
	});
};

/**
 * GET /api/github
 * GitHub API Example.
 */
/*exports.getGithub = (req, res, next) => {
	const github = new GitHub();
	github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' }, (err, repo) => {
		if (err) { return next(err); }
		res.render('api/github', {
			title: 'GitHub API',
			repo
		});
	});
};*/


/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
	res.render('api/upload', {
		title: 'File Upload'
	});
};

exports.postFileUpload = (req, res) => {
	req.flash('success', { msg: 'File was uploaded successfully.' });
	res.redirect('/api/upload');
};

