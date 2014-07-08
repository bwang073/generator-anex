module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		dist : 'dist'
	};

	grunt.initConfig({

		// Project settings
		yeoman : appConfig,
		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare : {
			html : 'views/index.html',
			options : {
				dest : '<%%= yeoman.dist %>/public',
				flow : {
					html : {
						steps : {
							js : [ 'concat', 'uglifyjs' ]
						},
						post : {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin : {
			html : [ '<%%= yeoman.dist %>/views/index.html' ]
		},
		copy : {
			main : {
				files : [ {
					expand : true,
					src : [ 'package.json', 'app.js', 'bin/**', 'config/**', 'views/**', 'routes/**' ],
					dest : '<%%= yeoman.dist %>/'
				}, {
					expand : true,
					src : [ 'public/stylesheets/**', 'public/images/**' ],
					dest : '<%%= yeoman.dist %>/'
				} ]
			}
		}
	});

	grunt.registerTask('build', [ 'useminPrepare', 'concat', 'copy', 'uglify', 'usemin' ]);

};