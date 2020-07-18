const mongoose = require('mongoose')
const schema = mongoose.Schema(
  {
    urlid: { type: mongoose.Schema.ObjectId, default: null, ref: 'URL' },
    urlkey: { type: String, default: null },
    referer: { type: String, default: null },
    userAgent: { type: String, default: null },
    language: { type: String, default: null },
    added: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  },
)

const LOG = mongoose.model('Log', schema)

module.exports.addOne = (data) => {
  LOG.create(data)
}
