'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');
var fs = require('fs');

var BwGenerator = yeoman.generators.Base.extend({
	init : function() {
		this.argument('appname', {
			type : String,
			required : false
		});
		this.appname = this.appname || path.basename(process.cwd());
		this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
		this.pkg = require('../package.json');
		this.sourceRoot(path.join(__dirname, '../templates'));

		this.on('end', function() {
			var _this = this;
			this.installDependencies({
				skipInstall : this.options['skip-install'],
				skipMessage : this.options['skip-message'],
				callback : function() {
					_this.invoke('karma:app', {
						options : {
							'skip-install' : _this.options['skip-install'],
							'plugins' : 'karma-coverage',
							'base-path' : '../../../',
							'coffee' : _this.options.coffee,
							'travis' : true,
							'bower-components' : [ 'angular/angular.js', 'angular-animate/angular-animate.js', 'angular-cookies/angular-cookies.js', 'angular-resource/angular-resource.js', 'angular-route/angular-route.js', 'angular-sanitize/angular-sanitize.js', 'angular-mocks/angular-mocks.js' ].join(','),
							'app-files' : 'client/scripts/**/*.js',
							'test-files' : 'test/client/specs/**/*.js',
							'config-path' : 'test/client/configs',
							'bower-components-path' : 'client/bower_components'
						}
					});
					var wireDepConfig = {
						ignorePath : '../../client/',
						src : 'server/views/index.html'
					};
					wiredep(wireDepConfig);
				}
			});
		});
	},

	// askFor: function () {
	// var done = this.async();
	//
	// // Have Yeoman greet the user.
	// this.log(yosay('Welcome to the marvelous Bw generator!'));
	//
	// var prompts = [{
	// type: 'confirm',
	// name: 'someOption',
	// message: 'Would you like to enable this option?',
	// default: true
	// }];
	//
	// this.prompt(prompts, function (props) {
	// this.someOption = props.someOption;
	//
	// done();
	// }.bind(this));
	// },

	app : function() {
		this.copy('common/_package.json', 'package.json');
		this.copy('common/_bower.json', 'bower.json');
		this.copy('common/_Gruntfile.js', 'Gruntfile.js');
		this.directory('bin', 'bin');
		this.directory('server', 'server');
		this.directory('client', 'client');
		this.directory('test', 'test');
	},

	projectfiles : function() {
		this.copy('common/editorconfig', '.editorconfig');
		this.copy('common/jshintrc', '.jshintrc');
		this.copy('common/bowerrc', '.bowerrc');
	}
});

module.exports = BwGenerator;
