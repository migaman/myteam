"use strict";

var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");

/*
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
	var pg = req.pg;

	var pgClient = new pg.Client({
		connectionString: process.env.DATABASE_URL
	});

	pgClient.connect();

	var sql = "SELECT array_to_json(array_agg(t)) FROM mt_example t";

	pgClient.query(sql, (err, pgRes) => {
		if (err) throw err;

		res.json(pgRes.rows[0].array_to_json);

		pgClient.end();


	});

});


/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {

	var pg = req.pg;
	var pgClient = new pg.Client({
		connectionString: process.env.DATABASE_URL
	});

	pgClient.connect();

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;

	var sql = "INSERT INTO mt_example (exampletext) VALUES ($1)";

	pgClient.query(sql, [userName], (err, pgRes) => {
		if (err) {
			throw err;
		}

		log.debug("Insert Example erfolgreich" + pgRes);

		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);

		pgClient.end();


	});
});


/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
	var pg = req.pg;
	var pgClient = new pg.Client({
		connectionString: process.env.DATABASE_URL
	});

	pgClient.connect();

	// Get our form values. These rely on the "name" attributes
	var userToDelete = req.params.id;

	var sql = "DELETE FROM mt_example WHERE idExample = $1";

	pgClient.query(sql, [userToDelete], (err, pgRes) => {
		if (err) {
			throw err;
		}

		log.debug("Delete Example erfolgreich" + pgRes);

		res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });

		pgClient.end();

	});
});

module.exports = router;