'use strict';

var should = require('should');
var app = require('../../../bin/www');
var request = require('supertest');

describe('GET /partials/:page', function() {

	it('should get 401 due to not authorized.', function(done) {
		request(app).get('/partials/home').expect(401).expect('Content-Type', /json/).end(function(err, res) {
			if (err) {
				return done(err);
			}
			res.body.should.eql({
				status : 401,
				message : 'Not Authorized'
			});
			done();
		});
	});

	var cookies;

	it('should login failure with wrong user id.', function(done) {
		request(app).post('/login').send({
			userid : 'whoever',
			password : 'whoever'
		}).expect(401).expect('Content-Type', /json/).end(function(err, res) {
			if (err) {
				return done(err);
			}
			res.body.should.eql({
				status : 401,
				message : 'No such user whoever existing.'
			});
			done();
		});
	});
	
	it('should login failure with wrong password.', function(done) {
		request(app).post('/login').send({
			userid : 'brianwwo',
			password : 'whoever'
		}).expect(401).expect('Content-Type', /json/).end(function(err, res) {
			if (err) {
				return done(err);
			}
			res.body.should.eql({
				status : 401,
				message : 'Password not correct.'
			});
			done();
		});
	});

	it('should login success.', function(done) {
		request(app).post('/login').send({
			userid : 'brianwwo',
			password : 'brianwwo'
		}).expect('Content-Type', /json/).end(function(err, res) {
			if (err) {
				return done(err);
			}
			res.body.should.eql({
				message : 'success'
			});
			cookies = res.headers['set-cookie'].pop().split(';')[0];
			done();
		});
	});
	it('should get /partials/home.', function(done) {
		var req = request(app).get('/partials/home');
		req.cookies = cookies;
		req.expect('Content-Type', /text/).expect(200).end(function(err, res) {
			if (err) {
				return done(err);
			}
			done();
		});
	});
});