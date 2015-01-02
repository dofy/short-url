var router = require('express').Router(),
    smart = require('../smartNumber'),
    url = require('../models/url'),
    log = require('../models/log');

router.route('/:key')
.get(function(req, res, next) {
    var key = req.params.key;

    console.log(smart.str2num(key));

    res.send(key);
});

module.exports = router;
