var chars, reg, len = 0;

// init characters
function characters(value) {
    if(value) {
        chars = value;
        len = value.length;
        reg = new RegExp('^[' + value + ']+$');
    } else {
        return chars;
    }
};

// get string from a number
function numberToString(num) {
    if(len === 0)
        throw new Error('Please set Characters first, use character method.');
    
    var ind, inds = [], next, result = [];
    next = Math.abs(parseInt(num)) || 0;

    do {
        inds.push(next % len);
        next = Math.floor(next / len);
    } while(next > 0);

    while(inds.length) {
        ind = inds.pop()
        result.push(chars[ind]);
    }

    return result.join('');
};

// get number from string
function stringToNumber(str) {
    if(len === 0)
        throw new Error('Please set Characters first, use character method.');

    if(!str || typeof str !== 'string' || !reg.test(str))
        return NaN;

    var result = 0;
    for(var i = 0, l = str.length, ind; i < l; i++) {
        ind = chars.indexOf(str[i]);
        result += Math.pow(len, i) + ind - 1;
    }

    return result;
};

module.exports = {
    chars: characters,
    characters: characters,
    n2s: numberToString,
    num2str: numberToString,
    numberToString: numberToString,
    s2n: stringToNumber,
    str2num: stringToNumber,
    stringToNumber: stringToNumber
};
