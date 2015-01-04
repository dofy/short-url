var spawn = require('child_process').spawn;

function createChild() {
    var server = spawn('node', ['short.js'], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore']
    });
    server.unref();
    console.log('foco pid:', server.pid);

    server.on('error', function(code, signal) {
        server.kill(signal);
        server = createChild();
    });

    server.on('exit', function(code, signal) {
        console.log('Bye :D');
    });

    return server;
}

createChild();
