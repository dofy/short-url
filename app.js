var express = require('express'),
    app     = express(),
    config  = require('./lib/config'),
    db      = require('./lib/db'),
    url     = require('./lib/models/url'),
    smart   = require('./lib/smartNumber');

db.connect(config.db, function(err) {
    if(err) {
        console.error(err);
        process.exit(0);
    } else {
        smart.chars(config.chars);
        url.init(smart.str2num('dan'));
        console.info('-- service init');
    }
});

app.use(express.static(__dirname + '/public'));

app.use('/_', require('./lib/routers/api'));
app.use('/', require('./lib/routers/go'));

app.use('*', function(req, res, next) {
    res.send('Short URL Service');
});

console.log('=====================================================');
console.log('==     |-.-|      SHORT URL SERVICE      |-.-|     ==');
console.log('=====================================================');
console.log('==        >>>  CTRL+C to Quit Service.  <<<        ==');
console.log('==    Started at ' + new Date().toUTCString() + '     ==');
console.log('=====================================================');

app.listen(7777);

