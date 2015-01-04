var url = require('url'),
    smart = require('../smartNumber'),
    mongoose = require('mongoose'),
    schema = mongoose.Schema({
        key: String,
        url: String,
        added: {type: Date, default: Date.now}
    }, {
        versionKey: false,
        toJSON: {virtuals: true}
    });

schema.virtual('info').get(function() {
    return url.parse(this.url);
});

var URL = mongoose.model('URL', schema);

// init url model
module.exports.init = function(start) {
    URL.findOne().select('key').sort('-added').exec(function(err, result) {
        if(result) {
            global.next = Math.max(start, smart.str2num(result.key) + 1);
        } else {
            global.next = start;
        }
        console.log('-- global.next', global.next);
    });
};

// add new url
module.exports.findOrCreate = function(url, callback) {
    console.log('-- find or create', url);
    URL.findOne({url: url}, function(err, result) {
        if(result) {
            callback(err, result);
        } else {
            // create new
            URL.create({key: smart.num2str(global.next++), url: url}, callback);
        }
    });
};

// find by key
module.exports.findByKey = function(key, callback) {
    console.log('-- find by key', key, smart.str2num(key));
    URL.findOne({key: key}).exec(callback);
};
