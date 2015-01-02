var router = require('express').Router(),
    smart = require('../smartNumber'),
    url = require('../models/url'),
    log = require('../models/log'),
    urlz = require('url');

router.route('/:key')
.get(function(req, res, next) {
    var header = req.headers,
        key = req.params.key;
    url.findByKey(key, function(err, result) {
        log.addOne({
            urlid: result ? result._id : null,
            urlkey: key,
            referer: header['referer'],
            userAgent: header['user-agent'],
            language: header['accept-language']
        });
        if(result) {
            res.redirect(result.url);
        } else {
            res.status(404).end();
        }
    });
});

module.exports = router;
