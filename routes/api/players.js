"use strict";

var express = require('express');
var router = express.Router();
var db = require('./../../db');


/*
 * GET eventlist.
 */
router.get('/playerlist', function (req, res) {
	db.selectPlayers((err, players) => {
		if (err) {
			throw err;
		}
		res.json(players);
	});
});



/*
 * Get details of event
 */
router.get('/:id', function (req, res) {
	// Get our form values. These rely on the "name" attributes
	var idplayer = req.params.id;

	db.selectPlayer(idplayer, (err, player) => {
		if (err) {
			throw err;
		}
		res.json(player);
	});
});



module.exports = router;