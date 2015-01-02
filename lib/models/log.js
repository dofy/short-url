var mongoose = require('mongoose'),
    schema = mongoose.Schema({
        urlid: {type: mongoose.Schema.ObjectId, default: null, ref: 'URL'},
        urlkey: {type: String, default: null},
        referer: {type: String, default: null},
        userAgent: {type: String, default: null},
        language: {type: String, default: null},
        added: {type: Date, default: Date.now}
    }, {
        versionKey: false,
        toJSON: {virtuals: true}
    });

var LOG = mongoose.model('Log', schema);

module.exports.addOne = function(data, callback) {
    LOG.create(data);
};
