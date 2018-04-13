"use strict";
var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");


/* GET home page. */
router.get('/', function (req, res) {
	log.debug("This is in the index module");
	res.render('home', {
		title: 'Home'
	});
});

/* GET REST Example-page. */
router.get('/rest', function (req, res) {
	res.render('rest', { title: 'Rest Example' });
});

/* GET list of events page */
router.get('/events', function (req, res) {
	res.render('events', { title: 'Events' });
});


module.exports = router;
