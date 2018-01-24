var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    
	/*var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });*/
	
	var pg = req.pg;
	
	var pgClient = new pg.Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true,
	});
	
    
	pgClient.connect();
	
	var sql = "SELECT array_to_json(array_agg(t)) FROM mt_example t";
		
	pgClient.query(sql, (err, pgRes) => {
		if (err) throw err;
		
		var myJson = "";
		res.json(pgRes.rows[0].array_to_json);
		
		pgClient.end();
		
		
	});
	
	
});


/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    /*var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });*/
	
	
	var pg = req.pg;
	var pgClient = new pg.Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true,
	});
	
	pgClient.connect();
	
	// Get our form values. These rely on the "name" attributes
    var userName = req.body.username;

	var sql = "INSERT INTO mt_example (exampletext) VALUES ($1)";
		
	pgClient.query(sql,[userName], (err, pgRes) => {
		if (err) throw err;
		
		res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
		
		pgClient.end();
		
		
	});
	

	
	
	
});


/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    
	
	/*var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });*/
	
	
	var pg = req.pg;
	var pgClient = new pg.Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true,
	});
	
	pgClient.connect();
	
	// Get our form values. These rely on the "name" attributes
	
    var userToDelete = req.params.id;

	var sql = "DELETE FROM mt_example WHERE idExample = $1";
		
	pgClient.query(sql,[userToDelete], (err, pgRes) => {
		if (err) throw err;
		
		res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
		
		pgClient.end();
		
		
	});
	
	
	
	
	
});

module.exports = router;