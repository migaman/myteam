var http = require('http');

const PORT = process.env.PORT;

//Needs feature Dyno Metadata (https://stackoverflow.com/questions/7917523/how-do-i-access-the-current-heroku-release-version-programmatically)
const VERSION = process.env.HEROKU_RELEASE_VERSION;

http.createServer(function (req, res) {
	console.log("great!");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World! Release: ' + VERSION);
}).listen(PORT); 




