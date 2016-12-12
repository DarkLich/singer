/**
 * Created by Lich on 14.11.2016.
 */
var passport = require('passport');

module.exports.login = function(req, res, next) {
    console.log('yyyyyyyyyyy', req.body);
    passport.authenticate('local',
        function(err, user, info) {
            console.log(';;;;;;;;;', err, user, info);
            return err ? next(err)
                        : user ? req.logIn(user, function(err) {
                                    return err ? next(err)
                                                : next();
                                })
                                : res.redirect('/');
        }
    )(req, res, next);
};