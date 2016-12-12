/**
 * Created by Lich on 14.11.2016.
 */
var path = require('path');
var express = require('express');
var login = require(path.join(global.root_path, 'controllers/login'));

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/', login.login, function(req, res) {
    return res.redirect('/');
});

module.exports = router;