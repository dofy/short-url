const url = require('url')
const smart = require('../smartNumber')
const mongoose = require('mongoose')
const schema = mongoose.Schema(
  {
    key: String,
    url: String,
    added: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  },
)

schema.virtual('info').get(() => {
  return url.parse(this.url)
})

var URL = mongoose.model('URL', schema)

// add new url =>function  function =>
module.exports.findOrCreate = (url, callback) => {
  console.log('-- URL : find or create', url)
  URL.findOne({ url }, (err, result) => {
    if (result) {
      callback(err, result)
    } else {
      // create new
      URL.create({ key: smart.num2str(new Date().getTime()), url }, callback)
    }
  })
}

// find by key
module.exports.findByKey = (key, callback) => {
  console.log('-- URL : find by key', key, smart.str2num(key))
  URL.findOne({ key }).exec(callback)
}
