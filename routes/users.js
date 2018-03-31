"use strict";

var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = require('./../db');

/*
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
	db.selectAllUsers((err, jsonAllUsers) => {
		if (err) throw err;
		res.json(jsonAllUsers);
	});
});


/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {

	// Get our form values. These rely on the "name" attributes
	//var userName = req.body.username;
	var email = req.body.email;
	log.info("create new user " + email);
	var hash = 'xxxxx';

	db.insertUserAccount(email, hash, (err, idaccount) => {
		if (err) throw err;
		log.debug("Insert Example erfolgreich, neue id: " + idaccount);
		res.send({ msg: '' });
	});
});


/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
	// Get our form values. These rely on the "name" attributes
	var idaccount = req.params.id;
	log.info("Delete User Id: " + idaccount);

	db.deleteUserAccount(idaccount, (err) => {
		if (err) throw err;
		log.debug("delete user account successful");
		res.send({ msg: '' });
	});
});

module.exports = router;