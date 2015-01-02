var router = require('express').Router(),
    url = require('../models/url');

router.route('/')
.get(function(req, res, next) {
    res.send('api...');
});

module.exports = router;
