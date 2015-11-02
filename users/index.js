var http = require('http');

var server = http.createServer(function(request, response) {
    response.end('It Works!!!');
});

var PORT = process.env.PORT || 8080;

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});