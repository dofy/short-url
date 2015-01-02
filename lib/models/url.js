var url = require('url'),
    smart = require('../smartNumber'),
    mongoose = require('mongoose'),

    schema = mongoose.Schema({
        key: String,
        url: String,
            /*
            href: String,
            protocol: String,
            slashes: Boolean,
            auth: String,
            hostname: String,
            port: Number,
            pathname: String,
            search: String,
            path: String,
            query: String,
            hash: String
            */
        hits: {type: Number, default: 0},
        added: {type: Date, default: Date.now},
    }, {
        versionKey: false,
        toJSON: {virtuals: true}
    });

var count;

schema.virtual('info').get(function() {
    return url.parse(this.url);
});

module.exports = mongoose.model('URL', schema);

// init url model
module.exports.init = function() {
    this.find().count(function(err, result) {
        if(!err) {
            count = result;
        }
    });
};

// add new url
module.exports.add = function(url, callback) {
    var key = smart.num2str(++count);

    console.log(key);
};
