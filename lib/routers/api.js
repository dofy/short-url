var router = require('express').Router(),
    smart = require('../smartNumber'),
    url = require('../models/url'),
    urlz = require('url');

router.route('/')
.get(function(req, res, next) {
    var urlObj = urlz.parse(req.query.url || '');

    if(!urlObj.protocol || !urlObj.hostname) {
        res.status(400).jsonp({error: 'Bad URL :('});
    } else if(urlObj.host === req.headers.host) {
        res.status(400).jsonp({error: 'Are you kidding me ?!'});
    } else {
        var dots = urlObj.hostname.split('.');
        if(dots.length === 1 || dots[0] === '' || dots.pop() === '') {
            res.status(400).jsonp({error: 'Bad URL ... 8('});
        } else {
            url.findOrCreate(urlObj.href, function(err, result) {
                if(result) {
                    res.jsonp({url: req.protocol + '://' + req.headers.host + '/' + result.key});
                } else {
                    res.status(400).jsonp({error: 'Unknown Error ...'});
                }
            });
        }
    }
});

module.exports = router;
