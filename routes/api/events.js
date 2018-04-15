"use strict";

var express = require('express');
var router = express.Router();
var db = require('./../../db');


/*
 * GET eventlist.
 */
router.get('/eventlist', function (req, res) {
	db.selectEvents(req.user.idaccount, (err, appointments) => {
		if (err) {
			throw err;
		}
		res.json(appointments);
	});
});



/*
 * Get details of event
 */
router.get('/:id', function (req, res) {
	// Get our form values. These rely on the "name" attributes
	var idevent = req.params.id;

	db.selectEvent(idevent, (err, event) => {
		if (err) {
			throw err;
		}
		res.json(event);
	});
});



module.exports = router;