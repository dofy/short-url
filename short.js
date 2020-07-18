const express = require('express')
const path = require('path')
const fs = require('fs')
const db = require('./lib/db')
const config = require('./lib/config')
const smart = require('./lib/smartNumber')

const app = express()

db.connect(config.db, () => {
  smart.chars(config.chars)
  console.info('-- service init')
})

app.use(express.static(path.join(__dirname, '/public')))

app.use('/_', require('./lib/routers/api'))
app.use('/', require('./lib/routers/go'))

app.use('*', (req, res) => {
  let apiURL = req.protocol + '://' + req.headers.host + '/_'
  fs.readFile(
    path.join(__dirname, 'pages/index.html'),
    { encoding: 'utf8' },
    (err, result) => {
      if (err) {
        res.status(404).send('Oooooops...').end()
      } else {
        res.status(200).send(result.replace('{apiURL}', apiURL)).end()
      }
    },
  )
})

console.log('=====================================================')
console.log('==     |-.-|      SHORT URL SERVICE      |-.-|     ==')
console.log('=====================================================')
console.log('==        >>>  CTRL+C to Quit Service.  <<<        ==')
console.log('==    Started at ' + new Date().toUTCString() + '     ==')
console.log('=====================================================')

app.listen(config.port)
