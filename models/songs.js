/**
 * Created by Lich on 27.10.2016.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Songs = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

module.exports = {scheme: Songs, model: mongoose.model('Songs', Songs)};

