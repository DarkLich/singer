/**
 * Created by Lich on 26.10.2016.
 */
var mongoose = require('mongoose');

var users = require('../models/users');
var singers = require('../models/singers');
var songs = require('../models/songs');

mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

module.exports.Users = users;
module.exports.Singers = singers;
module.exports.Songs = songs;






