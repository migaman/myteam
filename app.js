"use strict";
/**
 * Module dependencies.
 */
require('env2')('.env');
const express = require('express');
const compression = require('compression');
const session = require('express-session');
//var favicon = require('serve-favicon');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
var pgSession = require('connect-pg-simple')(session);
const flash = require('express-flash');
const path = require('path');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
//var fs = require('fs');


//Postgres
const pg = require('pg');

//Logging
var log = log4js.getLogger("app");

//Needs feature Dyno Metadata (https://stackoverflow.com/questions/7917523/how-do-i-access-the-current-heroku-release-version-programmatically)
const VERSION = process.env.HEROKU_RELEASE_VERSION;


const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Controllers (route handlers).
 */
var routeHome = require('./routes/home');
var routeUsers = require('./routes/users');
var userController = require('./routes/user');
var apiController = require('./routes/api');
var contactController = require('./routes/contact');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');




/**
 * Create Express server.
 */
const app = express();


/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public')
}));
//TODO: remove morgan logger
app.use(logger('dev'));
// setup the logger
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'debug' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(session({
	store: new pgSession({
		conString: process.env.DATABASE_URL,
		tableName: 'mt_session'
	}),
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: false,
	cookie: {
		maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
		httpOnly: true
		//, secure: true // only when on HTTPS
	}
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	if (req.path === '/api/upload') {
		next();
	}
	else if (req.path.startsWith('/users/deleteuser')) {
		next();
	}
	else if (req.path.startsWith('/users/adduser')) {
		next();
	}
	else {
		lusca.csrf()(req, res, next);
	}
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});
app.use((req, res, next) => {
	// After successful login, redirect back to the intended page
	if (!req.user &&
		req.path !== '/login' &&
		req.path !== '/signup' &&
		!req.path.match(/^\/auth/) &&
		!req.path.match(/\./)) {
		req.session.returnTo = req.path;
	} else if (req.user &&
		req.path === '/account') {
		req.session.returnTo = req.path;
	}
	next();
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


// Make our db accessible to our router
app.use(function (req, res, next) {
	req.pg = pg;
	next();
});

//App routes
app.use('/', routeHome);
app.use('/users', routeUsers);

/**
 * Primary app routes.
 */
//app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
/*app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);*/
app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);

/**
 * OAuth authentication routes. (Sign in)
 */
/*

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
*/

/**
 * Error Handler.
 */
app.use(errorHandler());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	log.error("Something went wrong:", err);
	err.status = 404;
	next(err);
});


// error handler
app.use(function (err, req, res, next) {
	log.error("Something went wrong:", err);
	// set locals, only providing error in development


	log.debug("Error handler next: " + next);

	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


log.debug("Release Version: " + VERSION);

module.exports = app;
