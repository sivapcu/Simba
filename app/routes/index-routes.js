'use strict';

let path = require('path');
let log = require('log4js').getLogger("index-routes");

module.exports = function(app, passport) {
    /**
     * Front end routes shall come here.
     */

    /**
     * Process the login form
     */
     app.post('/api/login', function(req, res, next) {
         passport.authenticate('local-login', function(err, user, info){
             if(err) {
                 return next(err);
             }
             if(!user) {
                 return res.send({success:false, message: info});
             } else {
                 req.logIn(user, function(err) {
                     if(err) {
                         return next(err);
                     }
                     return res.send({success : true, message : info});
                 });
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
            if(!user) {
                return res.send({success:false, message: info});
            } else {
                req.logIn(user, function(err) {
                    if(err) {
                        return next(err);
                    }
                    return res.send({success : true, message : info});
                });
            }
        })(req, res, next);
    });

    app.post('/api/profile', isLoggedIn, function(req, res) {
        res.send({success:true, user:req.user});
    });

    app.get('/api/loggedIn', function(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    /**
     * Log out
     */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            log.debug("**************** Authentication Successful **********************");
            return next();
        } else {
            log.debug("**************** Authentication Failed **********************");
            return res.sendStatus(401);
        }
    }

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html')); // load our public/index.html file
    });

};
