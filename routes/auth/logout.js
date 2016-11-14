/**
 * Created by Lich on 14.11.2016.
 */
var path = require('path');
var express = require('express');
var logout = require(path.join(global.root_path, 'controllers/logout'));

var router = express.Router();

router.get('/', logout.logout, function(req, res, next) {
    //res.render('login', { title: 'Express' });
});

module.exports = router;