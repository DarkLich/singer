var path = require('path');
var express = require('express');
var mongoose = require(path.join(global.root_path, 'libs/mongoose_driver'));

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return mongoose.Users.api.findAll().then(function(users){
    res.locals.users = users;
    return res.render('index', { users: users });
  });
});

router.get('/a', function(req, res, next) {
  res.render('templates/_youtube', {layout: false});
});

module.exports = router;
