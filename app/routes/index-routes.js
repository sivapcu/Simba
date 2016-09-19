'use strict';

let path = require('path');

module.exports = function(app, passport) {
    /**
     * Front end routes shall come here.
     */

    /**
     * Home page with login links
     */
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
     });

    /**
     * Process the login form
     */
     app.post('/api/login', function(req, res, next) {
         passport.authenticate('local-login', function(err, user, info){
             if(err) {
                 return next(err);
             }
             if(user === false) {
                 res.status(401).send(req.flash('loginMessage'));
             } else {
                 res.status(200).send(req.flash('loginMessage'));
             }
         })(req, res, next);
     });


    /**
     * Process the Signup form
     */
    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info){
            if(err) {
                return next(err);
            }
            if(user === false) {
                res.status(401).send(req.flash('signupMessage'));
            } else {
                res.status(200).send(req.flash('signupMessage'));
            }
        })(req, res, next);
    });

    /**
     * Log out
     */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /**
     * Route to middleware to make sure the user is logged in
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {Boolean}       [description]
     */
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            return next();
        }
        // if not redirect them to the home page
        res.redirect('/');
    }

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html')); // load our public/index.html file
    });

};
