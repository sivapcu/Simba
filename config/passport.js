var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/user');

var authConfig = require('./auth');

module.exports = function(passport) {
    /**
     * Passport session setup
     * Required for persistent login sessions.
     * Passport needs ability to serialize and deserialize users from the session
     */

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findOne({_id : id}, function(err, user) {
            done(err, user);
        });
    });

    /**
     * Local Signup
     * We are using named strategies since we have one for login and one for signup.
     * By default, if there was no name, it would just be called 'local'
     */
    passport.use('local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, 'That email is already taken!');
                    } else {
                        // if there is no user with that email, create the user
                        var newUser = new User();
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);
                        // save the user
                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser, 'Registration Successful!');
                        });
                    }
                });
            });
        })
    );

    /**
     * Local Login
     * We are using named strategies since we have one for login and one for signup.
     * By default, if there was no name, it would just be called 'local'
     */
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done){ // callback with email and password from our form
        // check if user email exists in database
        User.findOne({'local.email' : email }, function(err, user){
            //if there are any errors, return the error
            if(err) {
                return done(err);
            }

            // if user not found, return the message using flash
            if(!user) {
                return done(null, false, 'Invalid Username or Password!');
            }

            // if user found but password is wrong, return the message using flash
            if(!user.validPassword(password)) {
                return done(null, false, 'Invalid Username or Password!');
            }

            // all is well, return successful user
            return done(null, user, 'Login Successful!');
        });
    }));

    //facebook login strategy
	passport.use('facebook', new FacebookStrategy({
		clientID: authConfig.facebookAuth.clientID,
		clientSecret: authConfig.facebookAuth.clientSecret,
		callbackURL: authConfig.facebookAuth.callbackURL
	},
    // facebook will send back the tokens and profile
    function(accessToken, refreshToken, profile, done){
        // asynchronous
		process.nextTick(function(){
			console.log('AccessToken : '+accessToken);
			console.log('RefreshToken : '+refreshToken);
			console.log('Profile : ');
            console.log(profile);
            // find the user in the database based on their facebook id
			User.findOne({'facebook.id': profile.id}, function(err, user){
				if(err) {
                    return done(err);
                }

				if(user) {
                    return done(null, user);
                } else{
					var newUser = new User();
					newUser.facebook.id = profile.id;
					newUser.facebook.accessToken = accessToken;
                    newUser.facebook.displayName = profile.displayName;
					newUser.facebook.firstName = profile.name.givenName;
                    newUser.facebook.lastName = profile.name.familyName;
					newUser.facebook.email = profile.emails? profile.emails[0].value : profile.id;

					newUser.save(function(err){
						if(err) {
                            throw err;
                        }
						return done(null, newUser);
					});
				}
			});
		});
	}));

};
