"use strict";

var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = require('./../db');

/*
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
	db.selectAllUsers((err, rs) => {
		if (err) throw err;
		res.json(rs.rows[0].array_to_json);
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

	db.insertUserAccount(email, hash, (err, rs) => {
		if (err) throw err;
		log.debug("Insert Example erfolgreich" + rs);
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

	db.deleteUserAccount(idaccount, (err, rs) => {
		if (err) throw err;
		log.debug("Delete Example erfolgreich" + rs);
		res.send({ msg: '' });
	});
});

module.exports = router;