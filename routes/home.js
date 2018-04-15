"use strict";
var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");
//Needs feature Dyno Metadata (https://stackoverflow.com/questions/7917523/how-do-i-access-the-current-heroku-release-version-programmatically)
var version = process.env.HEROKU_RELEASE_VERSION;


/* GET home page. */
router.get('/', function (req, res) {
	log.debug("This is in the index module");
	res.render('home', {
		title: 'Home',
		version: 'Release ' + version
	});
});

/* GET REST Example-page. */
router.get('/rest', function (req, res) {
	if (req.isAuthenticated()) {
		res.render('rest', { title: 'Rest Examples' });
	}
	else {
		res.redirect('/login');
	}
});

/* GET list of events page */
router.get('/events', function (req, res) {
	if (req.isAuthenticated()) {
		res.render('events', { title: 'Events' });
	}
	else {
		res.redirect('/login');
	}

});

/* GET list of event page */
router.get('/event', function (req, res) {
	if (req.isAuthenticated()) {
		res.render('event', { title: 'Event', idevent: req.query.idevent });
	}
	else {
		res.redirect('/login');
	}

});


module.exports = router;
