var cluster = require('cluster'),
    cpuNums = require('os').cpus().length;

if(cluster.isMaster) {
    // master
    for(var i=0; i<cpuNums; i++) {
        createFork();
    }
} else {
    // child
    var worker = require('./app');
}

// create fork
function createFork() {
    cluster.fork()
        .on('exit', function(code, signal) {
            console.log('exit :', code);
            createFork();
        });
}

process.on('exit', function() {
    for(var worker in cluster.workers) {
        worker.kill();
    }
});
