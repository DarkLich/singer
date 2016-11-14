/**
 * Created by Lich on 13.11.2016.
 */
var path = require('path');
var express = require('express');
var mongoose = require(path.join(global.root_path, 'libs/mongoose_driver'));
//var image_saver = require(path.join(global.root_path, 'libs/image_saver'));
var mustAuthenticatedMw = require(path.join(global.root_path, 'libs/must-authenticated')).mustAuthenticatedMw;

var router = express.Router();

router.get('/', mustAuthenticatedMw, function(req, res) {
    //return res.render('user', { title: 'Express' });
    return mongoose.Users.api.findAll().then(function(users){
        res.locals.users = users;
        return res.render('users', { users: users });
    });
});

router.post('/', function(req, res) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    return mongoose.Users.api.save(user).then(function(result){
        return res.send({ status: 'OK', users: user });
    });

});

router.get('/:id', function(req, res) {
    return mongoose.Users.api.findById(req.params.id).then(function(result){
        return res.send({ status: 'OK', users: result });
    });
});

router.put('/:id', function (req, res){
    var user = {
        name: req.body.name,
        description: req.body.description,
    };
    return mongoose.Users.api.update(req.params.id, user).then(function(result){
        return res.send({ status: 'OK', users: result });
    });
});

router.delete('/:id', function (req, res){
    return mongoose.Users.api.delete(req.params.id).then(function(result){
        return res.send({ status: 'OK', users: result });
    });
});

module.exports = router;