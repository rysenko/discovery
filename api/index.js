var registry = require('etc-registry');
var http = require('http');

registry.load({host: 'rysenko.com', path: '/registry'}, function() {
    console.log('Loaded registry', registry);
    var server = http.createServer(function(serverReq, serverRes) {
        console.log('Incoming request with headers: ' + JSON.stringify(serverReq.headers));
        var usersEndpoint = String(registry['users:8080']);
        if (!usersEndpoint) {
            return serverRes.end('Users service not found');
        }
        var usersEndpointParts = usersEndpoint.split(':');
        var clientReq = http.request({host: usersEndpointParts[0], port: usersEndpointParts[1], path: '/'}, function(clientRes) {
            var str = '';
            clientRes.on('data', function(chunk) {
                str += chunk;
            });
            clientRes.on('end', function() {
                serverRes.end('Users service is at: ' + usersEndpoint + '\nGot response from it: ' + str);
            });
        });
        clientReq.on('error', function(err) {
            console.log('Problem with request: ' + err.message);
            serverRes.end('Problem with users service availability');
        });
        clientReq.end();
    });
    var PORT = process.env.PORT || 8080;
    server.listen(PORT, function() {
        console.log('Server listening on: http://localhost:%s', PORT);
    });
});
