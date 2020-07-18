let chars = null
let reg = null
let len = 0

// init characters
function characters(value) {
  if (value) {
    chars = value
    len = value.length
    reg = new RegExp('^[' + value + ']+$')
  } else {
    return chars
  }
}

// get string from a number
function numberToString(num) {
  if (len === 0)
    throw new Error('Please set Characters first, use characters method.')

  let result = ''
  let next = Math.abs(parseInt(num)) || 0

  do {
    result = chars[next % len] + result
    next = Math.floor(next / len)
  } while (next > 0)

  return result
}

// get number from string
function stringToNumber(str) {
  if (len === 0)
    throw new Error('Please set Characters first, use characters method.')

  if (!str || typeof str !== 'string' || !reg.test(str)) return NaN

  let result = 0
  for (let i = 0, l = str.length, ind; i < l; i++) {
    ind = chars.indexOf(str[l - i - 1])
    result += Math.pow(len, i) * ind
  }

  return result
}

module.exports = {
  chars: characters,
  characters: characters,
  n2s: numberToString,
  num2str: numberToString,
  numberToString: numberToString,
  s2n: stringToNumber,
  str2num: stringToNumber,
  stringToNumber: stringToNumber,
}
