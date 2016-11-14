/**
 * Created by Lich on 14.11.2016.
 */
module.exports.mustAuthenticatedMw = function (req, res, next){
    console.log ('///////////// mustAuthenticatedMw', req.isAuthenticated(), req.isAuthenticated, req.body);
    if (req.isAuthenticated()) {
        next()
    } else {
        console.log("   -----------   NOT AUTH     --------------- ");
        res.redirect('/');
    }
    //req.isAuthenticated()
    //    ? next()
    //    : res.redirect('/');
};