var http = require('http');

const PORT = process.env.PORT;

http.createServer(function (req, res) {
	console.log("great!");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(PORT); 




