/**
 * Created by Lich on 14.11.2016.
 */
var path = require('path');
var express = require('express');
var mongoose = require(path.join(global.root_path, 'libs/mongoose_driver'));

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('registration', { title: 'Express' });
});

router.post('/', function(req, res) {
    var user = {
        accountName: req.body.accountName,
        email: req.body.email,
        password: req.body.password
    };

    return mongoose.Users.api.save(user).then(function(result) {
        return res.send({ success: true, users: user });
    }).catch(function(err) {
        return res.json({ success: false, errors: err.errors });
    });
});

module.exports = router;