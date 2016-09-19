'use strict';

/**
 * Modules
 */
let express = require('express');
let app = express(); // create our app with express
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser'); // pull information from HTML POST
let methodOverride = require('method-override');
let chalk = require('chalk'); // to the make console logging colorful

var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

/**
 * Configurations
 */
let db = require('./config/db');

/**
 * Set the application port
 */
let port = process.env.PORT || 3000;

/**
 * Connect to the database
 */
mongoose.connect(db.url);

require('./config/passport')(passport); // pass passport for configuration

/**
 * Get all data/stuff of the body (POST) parameters
 */
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));              // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(cookieParser());                                        // read cookies (needed for auth)
/**
 *  set the static files location. "/public/img" will be "/img" for users
 */
app.use(express.static(__dirname + '/public'));

/**
 * Log every request to console
 */
app.use(morgan('dev'));

// required for passport
app.use(session({ secret: 'thisissessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/**
 * Configure Routes
 */
require('./app/routes/employee-routes')(app, passport);
require('./app/routes/index-routes')(app, passport);

/**
 * Start the application
 */
app.listen(port);

/**
 * Inform user on starting the application
 */
console.log('Application started on the port : ', port);

/**
 * Expose the app
 */
module.exports = app;
