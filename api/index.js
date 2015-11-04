var registry = require('etc-registry');
var http = require('http');

registry.load({host: 'rysenko.com', path: '/registry'}, function() {
    console.log('Loaded registry', registry);
    var server = http.createServer(function(serverReq, serverRes) {
        console.log('Incoming request with headers: ' + JSON.stringify(serverReq.headers));
        var usersEndpoint = String(registry['users:8080']);
        if (!usersEndpoint) {
            return serverRes.end('Users service not found\n');
        }
        var usersEndpointParts = usersEndpoint.split(':');
        var clientReq = http.request({host: usersEndpointParts[0], port: usersEndpointParts[1], path: '/'}, function(clientRes) {
            var str = '';
            clientRes.on('data', function(chunk) {
                str += chunk;
            });
            clientRes.on('end', function() {
                serverRes.end('\x1b[36mUsers service is at: ' + usersEndpoint + '\x1b[0m\n\x1b[33mGot response from it: ' + str + '\x1b[0m\n');
            });
        });
        clientReq.on('error', function(err) {
            console.log('Problem with request: ' + err.message);
            serverRes.end('Problem with users service availability\n');
        });
        clientReq.end();
    });
    var PORT = process.env.PORT || 8080;
    server.listen(PORT, function() {
        console.log('Server listening on: http://localhost:%s', PORT);
    });
});
