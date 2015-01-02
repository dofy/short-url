var mongoose = require('mongoose'),
    schema = mongoose.Schema({
        urlid: {type: mongoose.Schema.ObjectId, ref: 'URL'},
        refer: {type: String, default: null},
        added: {type: Date, default: Date.now},
    }, {versionKey: false});

module.exports = mongoose.model('Log', schema);
