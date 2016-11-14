/**
 * Created by Lich on 14.11.2016.
 */
module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};