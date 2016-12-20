/**
 * Created by Lich on 13.11.2016.
 */
var path = require('path');
var express = require('express');
var mongoose = require(path.join(global.root_path, 'libs/mongoose_driver'));
var image_saver = require(path.join(global.root_path, 'libs/image_saver'));
var mustAuthenticatedMw = require(path.join(global.root_path, 'libs/must-authenticated')).mustAuthenticatedMw;

var router = express.Router();

router.get('/', function(req, res) {
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

//router.get('/:id', mustAuthenticatedMw, function(req, res) {
//    return mongoose.Users.api.findById(req.params.id).then(function(result){
//        return res.send({ status: 'OK', users: result });
//    });
//});

router.get('/profile', function(req, res) {
    console.log('========', req.session);
    if (req.session.passport) {
        return mongoose.Users.api.findById(req.session.passport.user).then(function(result){
            if (result.status == "OK") {
                return res.render('user_profile', {user: result.Users});
            } else {
                res.send({ success: false, message: "user not found" });
            }
        });
    } else {
        return res.redirect('/');
    }
});

router.post('/upload', image_saver.upload, function(req, res) {
    console.log('adadadadadadad', req.file)
    console.log('adadadadadadad111', req.session.passport.user)
    if (req.session.passport) {
        return mongoose.Users.api.update(req.session.passport.user, {photo: `${req.file.destination}/${req.file.filename}`}).then(function(result){
            console.log('jjjjjjjjj', result)
            if (result.status == "OK") {
                return res.json({ success: true, path: result.Users.photo});
            } else {
                res.send({ success: false, message: "user not found" });
            }
        });
    } else {
        return res.redirect('/');
    }
});

router.put('/:id', function (req, res){
    console.log('buuuuuuuuuuuuu', req.body);
    var user = req.body;
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