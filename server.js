'use strict';

/**
 * Modules
 */
let express = require('express');
let app = express(); // create our app with express
let mongoose = require('mongoose');
let bodyParser = require('body-parser'); // pull information from HTML POST
let methodOverride = require('method-override');

let passport = require('passport');
let flash = require('connect-flash');
let cookieParser = require('cookie-parser');
let session = require('express-session');

let log4js = require('log4js');
let log = log4js.getLogger('app');

/**
 * Configurations
 */
let db = require('./config/db');

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
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

// required for passport
app.use(session({
    secret: 'thisissessionsecret', // session secret
    resave: true,
    saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/**
 * Configure Routes
 */
require('./app/routes/employee-routes')(app, passport);
require('./app/routes/index-routes')(app, passport);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        log.error("Something went wrong:", err);
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
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Expose the app
 */
module.exports = app;
