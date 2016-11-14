/**
 * Created by Lich on 02.11.2016.
 */
var express = require('express');
var router = express.Router();
var users = require('./api/users');
var singers = require('./api/singers');

router.use('/users', users);
router.use('/singers', singers);

module.exports = router;