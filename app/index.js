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
			this.invoke('karma:app', {
				options : {
					'skip-install' : this.options['skip-install'],
					'base-path' : '../',
					'coffee' : this.options.coffee,
					'travis' : true,
					'bower-components' : [ 'angular-animate/angular-animate.js', 'angular-cookies/angular-cookies.js', 'angular-resource/angular-resource.js', 'angular-route/angular-route.js', 'angular-sanitize/angular-sanitize.js', 'angular/angular.js', 'angular-mocks/angular-mocks.js' ].join(','),
					'app-files' : 'public/javascripts/**/*.js',
					'test-files' : 'test/client/**/*.js',
					'bower-components-path' : 'public/bower_components'
				}
			});
			this.installDependencies({
				skipInstall : this.options['skip-install'],
				skipMessage : this.options['skip-message'],
				callback : function() {
					var wireDepConfig = {
						ignorePath : '../public/',
						src : 'views/index.html'
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
		this.copy('_app.js', 'app.js');
		this.directory('app/bin', 'bin');
		this.directory('app/config', 'config');
		this.directory('app/public', 'public');
		this.directory('app/routes', 'routes');
		this.directory('app/views', 'views');
		this.directory('test', 'test');
	},

	projectfiles : function() {
		this.copy('common/editorconfig', '.editorconfig');
		this.copy('common/jshintrc', '.jshintrc');
		this.copy('common/bowerrc', '.bowerrc');
	}
});

module.exports = BwGenerator;
