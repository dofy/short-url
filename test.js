var sn = require('./lib/smartNumber'),
    conf = require('./lib/config'),
    start, count, dict = {};

sn.chars(conf.chars);

start = sn.s2n('dze');
count = start + 10;

console.log('.START.');

for(var key, i = start; i < count; i++) {
    key = sn.n2s(i);
    console.log(key, i);
    if(dict.hasOwnProperty(key)) {
        console.log(key, dict[key], i);
    } else {
        dict[key] = i;
    }
}

console.log('.DONE.');
