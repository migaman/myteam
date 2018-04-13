"use strict";

var express = require('express');
var router = express.Router();
var db = require('./../db');


/*
 * GET userlist.
 */
router.get('/eventlist', function (req, res) {
	db.selectAppointment((err, appointments) => {
		if (err) {
			throw err;
		}
		res.json(appointments);
	});
});



module.exports = router;