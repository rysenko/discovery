var registry = require('etc-registry');

registry.load({host: 'rysenko.com', path: '/registry'}, function(err, registry) {
    var http = require('http');
    var server = http.createServer(function(request, serverRes) {
        var usersEndpoint = String(registry['users:8080']);
        var usersEndpointParts = usersEndpoint.split(':');
        http.request({host: usersEndpointParts[0], port: usersEndpointParts[1], path: '/'}, function(clientRes) {
            var str = '';
            clientRes.on('data', function (chunk) {
                str += chunk;
            });
            clientRes.on('end', function () {
                serverRes.end('Users is at: ' + usersEndpoint + '\nGot response from it: ' + str);
            });
        }).end();
    });
    var PORT = process.env.PORT || 8080;
    server.listen(PORT, function(){
        console.log("Server listening on: http://localhost:%s", PORT);
    });
});
