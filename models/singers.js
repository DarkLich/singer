/**
 * Created by Lich on 27.10.2016.
 */
var mongoose = require('mongoose');
var songs = require('./songs');

var Schema = mongoose.Schema;

var Singers = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    songs: [songs.scheme],
    modified: { type: Date, default: Date.now }
});

var mSigners = mongoose.model('Singers', Singers);

// validation
Singers.path('name').validate(function (v) {
    console.log ('sssssssss', v)
    return v.length > 2 && v.length < 70;
});

var api = {
    findAll: function() {
        return new Promise(function(resolve, reject) {
            mSigners.find(function (err, singers) {
                console.log('hhhhhhhhhhh', err, singers)
                if (!err) {
                    resolve(singers);
                } else {
                    console.log('Internal error(%d): %s', err.message);
                    reject(err);
                }
            });
        })
    },
    save: function(singer) {
        var newSinger = new mSigners(singer);
        return new Promise(function(resolve, reject) {
            newSinger.save(function (err) {
                if (!err) {
                    console.log("singers created");
                    resolve({status: 'OK', singers: newSinger});
                } else {
                    console.log(err);
                    if (err.name == 'ValidationError') {
                        reject({error: 'Validation error'});
                    } else {
                        reject({error: 'Server error'});
                    }
                    console.log('Internal error(%d): %s', err.message);
                }
            });
        });
    },
    findById: function(id) {
        return new Promise(function(resolve, reject) {
            mSigners.findById(id, function (err, singers) {
                if(!singers) {
                    res.statusCode = 404;
                    reject({ error: 'Not found' });
                }
                if (!err) {
                    resolve({ status: 'OK', singers:singers });
                } else {
                    console.log('Internal error(%d): %s',err.message);
                    reject({ error: 'Server error' });
                }
            });
        });
    },
    update: function(id, singer) {
        return new Promise(function(resolve, reject) {
            mSigners.findById(req.params.id, function (err, singers) {
                if(!singers) {
                    return reject({ error: 'Not found' });
                }

                singers.name = singer.name;
                singers.description =singer.description;
                singers.songs = [];
                return singers.save(function (err) {
                    if (!err) {
                        console.log("singers updated");
                        resolve({ status: 'OK', singers:singers });
                    } else {
                        if(err.name == 'ValidationError') {
                            reject({ error: 'Validation error' });
                        } else {
                            reject({ error: 'Server error' });
                        }
                        console.log('Internal error(%d): %s',err.message);
                    }
                });
            });
        });
    },
    delete: function(id) {
        return new Promise(function(resolve, reject) {
            mSigners.findById(id, function (err, singers) {
                if(!singers) {
                    return reject({ error: 'Not found' });
                }
                return singers.remove(function (err) {
                    if (!err) {
                        console.log("singers removed");
                        resolve({ status: 'OK' });
                    } else {
                        console.log('Internal error(%d): %s',err.message);
                        reject({ error: 'Server error' });
                    }
                });
            });
        });
    }
};

module.exports = {scheme: Singers, model: mSigners, api: api};