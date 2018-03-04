const env = require('env2')('.env');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')
//Postgres
const pg = require('pg');

//Logging
var log = log4js.getLogger("app");


//Needs feature Dyno Metadata (https://stackoverflow.com/questions/7917523/how-do-i-access-the-current-heroku-release-version-programmatically)
const VERSION = process.env.HEROKU_RELEASE_VERSION;


var index = require('./routes/index');
var users = require('./routes/users');
var teams = require('./routes/teams');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// setup the logger
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'debug' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.pg = pg;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/teams', teams);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  log.error("Something went wrong:", err);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  log.error("Something went wrong:", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

