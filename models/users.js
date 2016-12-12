/**
 * Created by Lich on 13.11.2016.
 */
var mongoose = require('mongoose');
var uniqueValidator  = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var Users = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, uniqueCaseInsensitive: true},
    password: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});
Users.plugin(uniqueValidator, {message: "This `{PATH}` is already registered"});

var mUsers = mongoose.model('Users', Users);

// validation
Users.path('name').validate(function (v) {
    console.log ('sssssssss', v)
    return v.length > 2 && v.length < 70;
}, "Length of `{PATH}` must be between 2 and 70");

var api = {
    findAll: function() {
        return new Promise(function(resolve, reject) {
            mUsers.find(function (err, users) {
                console.log('88888888888888888888', err, users)
                if (!err) {
                    resolve(users);
                } else {
                    console.log('Internal error(%d): %s', err.message);
                    reject(err);
                }
            });
        })
    },
    save: function(user) {
        var newUser = new mUsers(user);
        return new Promise(function(resolve, reject) {
            newUser.save(function (err) {
                if (!err) {
                    console.log("users created");
                    resolve({succes: true, users: newUser});
                } else {
                    console.log('+++++++', err);
                    if (err.name == 'ValidationError') {
                        errors = _.map(err.errors, (val) => {return {path: val.path, message: val.message}})
                        reject({succes: false, errors: errors, err: 'Validation error'});
                    } else if (err.name == 'MongoError' && err.code == 11000) {
                        reject({succes: false, errors: err, err: 'Server error'});
                    }
                    console.log('Internal error(%d): %s', err.message);
                }
            });
        });
    },
    findById: function(id) {
        return new Promise(function(resolve, reject) {
            mUsers.findById(id, function (err, users) {
                if(!users) {
                    res.statusCode = 404;
                    reject({ error: 'Not found' });
                }
                if (!err) {
                    resolve({ status: 'OK', Users: users });
                } else {
                    console.log('Internal error(%d): %s',err.message);
                    reject({ error: 'Server error' });
                }
            });
        });
    },
    update: function(id, user) {
        return new Promise(function(resolve, reject) {
            mUsers.findById(req.params.id, function (err, users) {
                if(!users) {
                    return reject({ error: 'Not found' });
                }

                users.name = user.name;
                users.description =user.description;
                return users.save(function (err) {
                    if (!err) {
                        console.log("users updated");
                        resolve({ status: 'OK', users: users });
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
            mUsers.findById(id, function (err, users) {
                if(!users) {
                    return reject({ error: 'Not found' });
                }
                return users.remove(function (err) {
                    if (!err) {
                        console.log("users removed");
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

module.exports = {scheme: Users, model: mUsers, api: api};