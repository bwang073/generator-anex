var express = require('express');
var util = require('util');
var router = express.Router();
var logger = require('../config/logger');

router.use(function(req, res, next) {
	logger.info('%s %s %s', req.method, req.url, req.path);
	next();
});

/* GET container */
router.get('/', function(req, res) {
	res.render('index');
});

/* GET login page. */
router.get('/partials/login', function(req, res) {
	res.render('partials/login');
});

/* POST login fun. */
router.post('/login', function(req, res, next) {
	// Simple login, add your authentication here.
	if (req.body.userid != 'brianwwo') {
		var err = new Error(util.format('No such user %s existing.', req.body.user));
		err.status = 401;
		next(err);
	} else if (req.body.password != 'brianwwo') {
		var err = new Error('Password not correct.');
		err.status = 401;
		next(err);
	} else {
		// Add user to session to maintain
		req.session.user = {
			id : 'brianwwo',
			name : 'Brian wang'
		};
		res.json({
			message : 'success'
		})
	}
});

router.use(function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		var err = new Error('Not Authorized');
		err.status = 401;
		next(err);
	}
});

router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.json({
			message : 'success'
		})
	})
});

router.get('/partials/:page', function(req, res) {
	res.render('partials/' + req.param('page'));
});

// ----------------------------------------------Your Request Here Start------------------------------------------------------------------->

// ----------------------------------------------Your Request Here End ------------------------------------------------------------------->

module.exports = router;
