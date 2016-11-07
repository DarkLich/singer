/**
 * Created by Lich on 02.11.2016.
 */
var express = require('express');
var router = express.Router();
var singers = require('./api/singers');

/* GET home page. */
router.use('/singers', singers);

module.exports = router;