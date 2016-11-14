var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

var mongoose = require('./mongoose_driver');
var User = mongoose.Users.model;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (username, password, done) {
    console.log('qqqqqqqqqqqq', username, password)
    User.findOne({email: username}, function (err, user) {
        console.log('zzzzzzzzzzzz', err, user)
        return err
            ? done(err)
            : user
            ? password === user.password
            ? done(null, user)
            : done(null, false, {message: 'Incorrect password.'})
            : done(null, false, {message: 'Incorrect username.'});
    });
}));

passport.serializeUser(function (user, done) {
    console.log('serializeUser', user)
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    console.log('!!!iiiiiiiiiiiiiii', id)
    User.findById(id, function (err, user) {
        console.log('!!!deserializeUser', id, err, user)
        err
            ? done(err)
            : done(null, user);
    });
});

module.exports = passport;