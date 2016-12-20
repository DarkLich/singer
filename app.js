global.root_path = __dirname;
global._ = require('lodash');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('./libs/passport_settings')

var routes = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/api/users');
var singers = require('./routes/api/singers');
var registration = require('./routes/auth/registration');
var login = require('./routes/auth/login');
var logout = require('./routes/auth/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//todo Почитать про secret
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(passport.initialize());
app.use(passport.session());

app.all('*', function(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use('/', routes);
//app.use('/users', users);
app.use('/api', api);
app.use('/registration', registration);
app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);
app.use('/singers', singers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
