var db = require('mongoose');

exports.connect = function(url, callback) {
    db.connect(url, callback);
}
