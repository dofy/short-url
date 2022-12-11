const mongoose = require('mongoose')
const db = mongoose.connection

exports.connect = (url, onopen = () => { }) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', onopen)
}
