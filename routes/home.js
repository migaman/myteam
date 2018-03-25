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

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
	log.debug("This is in the helloworld module");
	res.render('helloworld', { title: 'Hello, World!', user: 'hans' });
});

/* GET REST Example-page. */
router.get('/rest', function (req, res) {
	res.render('rest', { title: 'Hello, World!', user: 'hans' });
});

/* GET examplelist page. */
router.get('/examplelist', function (req, res) {
	var pg = req.pg;



	var pgClient = new pg.Client({
		connectionString: process.env.DATABASE_URL
	});

	pgClient.connect();

	var sql = "SELECT e.exampletext FROM mt_example e";

	pgClient.query(sql, (err, pgRes) => {
		if (err) throw err;
		var answer = "";
		for (let row of pgRes.rows) {
			answer += row.exampletext + "; ";
		}
		res.render('examplelist', { "answer": answer });

		pgClient.end();


	});


});

/* GET New User page. */
router.get('/newexample', function (req, res) {
	res.render('newexample', { title: 'Add New Example' });
});


/* POST to Add User Service */
router.post('/addexample', function (req, res) {

	// Set our internal DB variable
	var pg = req.pg;


	var pgClient = new pg.Client({
		connectionString: process.env.DATABASE_URL
	});


	pgClient.connect();


	// Get our form values. These rely on the "name" attributes
	var userName = req.body.examplename;


	var sql = "INSERT INTO mt_example (exampletext) VALUES ($1)";


	pgClient.query(sql, [userName], (err, pgRes) => {

		if (err) {
			throw err;
		}
		else {
			pgClient.end();

			log.debug("Insert erfolgreich" + pgRes);

			// And forward to success page
			res.redirect("examplelist");
		}





	});

	// Submit to the DB
    /*collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });*/
});

module.exports = router;
