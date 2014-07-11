var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('./config/logger');
var settings = require('./config/settings');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set html suffix of ejs engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());

if (app.get('env') === 'development') {
	app.use(require('connect-livereload')());
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret : settings.cookie_secret,
	store : new MongoStore({
		db : settings.db,
	}),
	resave : true,
	saveUninitialized : true
}));

app.use('/', routes);

// / catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send({
			status : err.status,
			message : err.message
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		status : err.status,
		message : err.message
	});
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	logger.info('Express server listening on port ' + server.address().port);
});

module.exports = app;
