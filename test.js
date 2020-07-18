const sn = require('./lib/smartNumber')
const conf = require('./lib/config')

sn.chars(conf.chars)

let start = sn.s2n('dzs')
let count = start + 17
let dict = {}

console.log('.START.')

for (let key, i = start; i < count; i++) {
  key = sn.n2s(i)
  console.log(key, i)
  if (dict.hasOwnProperty(key)) {
    console.log(key, dict[key], i)
  } else {
    dict[key] = i
  }
}

console.log('.DONE.')
