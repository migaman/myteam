'use strict';

var http = require('http');

const PORT = process.env.PORT;

//Needs feature Dyno Metadata (https://stackoverflow.com/questions/7917523/how-do-i-access-the-current-heroku-release-version-programmatically)
const VERSION = process.env.HEROKU_RELEASE_VERSION;

const pg = require('pg');

http.createServer(function (req, res) {
	console.log("great!");
	
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write('aaaa');
	
	//Read some records from database
	getExampleDBValues();
	
	res.end('Hello World! Release: ' + VERSION);
	
	
}).listen(PORT); 



function getExampleDBValues() {
	var values = "test";
	var pgClient = new pg.Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true,
	});

	pgClient.connect();
	
	var sql = "SELECT e.exampletext FROM mt_example e";
		
	pgClient.query(sql, (err, res) => {
		if (err) throw err;
		var answer = "";
		for (let row of res.rows) {
			answer += row.exampletext + "; ";
			console.log('DB value: ' + row.exampletext);
		}
		pgClient.end();
		
		
	});
	
	
	return values;
}


