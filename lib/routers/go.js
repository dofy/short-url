const router = require('express').Router()
const url = require('../models/url')
const log = require('../models/log')

router.route('/:key').get((req, res) => {
  let header = req.headers
  let key = req.params.key
  url.findByKey(key, function (_, result) {
    log.addOne({
      urlid: result ? result._id : null,
      urlkey: key,
      referer: header['referer'],
      userAgent: header['user-agent'],
      language: header['accept-language'],
    })
    if (result) {
      res.redirect(result.url)
    } else {
      res.status(404).send('404 :P')
    }
  })
})

module.exports = router
