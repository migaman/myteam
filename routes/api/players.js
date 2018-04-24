"use strict";

var express = require('express');
var router = express.Router();
var db = require('./../../db');
var log = require('log4js').getLogger("index");
var playermodel = require.main.require('../models/playermodel');

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
 * POST to addplayer.
 */
router.post('/addplayer', function (req, res) {
	log.info("create new player ");
	// Get our form values. These rely on the "name" attributes
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var playerno = req.body.playerno;


	var player = new playermodel();
	player.lastname = lastname;
	player.firstname = firstname;
	player.playerno = playerno;

	db.insertPlayer(player, (err, idplayer) => {
		if (err) {
			throw err;
		}
		log.debug("Insert Player successful, new player id: " + idplayer);
		//res.send({ msg: '' });
		res.redirect('/players');
	});
});


/*
 * Get details of player
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