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
        res.status(400).jsonp({error: 'Fuck Yourself !!!'});
    } else {
        url.findOrCreate(urlObj.href, function(err, result) {
            if(result) {
                res.jsonp({url: req.protocol + '://' + req.headers.host + '/' + result.key});
            } else {
                res.status(400).end();
            }
        });
    }
});

module.exports = router;
