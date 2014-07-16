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
			html : 'server/views/index.html',
			options : {
				dest : '<%%= yeoman.dist %>/client',
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
		wiredep : {
			target : {
				src : 'server/views/index.html', // point to your HTML file.
				ignorePath : '../../client/'
			}
		},
		clean : {
			build : [ '<%%= yeoman.dist %>', '.tmp' ],
			test : [ 'test/reporters' ]
		},
		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin : {
			html : [ '<%%= yeoman.dist %>/server/views/index.html' ],
			options : {
				assetsDirs : [ '<%%= yeoman.dist %>/client' ]
			}
		},
		filerev : {
			main : {
				src : [ '<%%= yeoman.dist %>/client/scripts/**/*.js' ]
			}
		},
		copy : {
			main : {
				files : [ {
					expand : true,
					src : [ 'package.json', 'server/**', 'bin/**' ],
					dest : '<%%= yeoman.dist %>/'
				}, {
					expand : true,
					src : [ 'client/css/**', 'client/images/**' ],
					dest : '<%%= yeoman.dist %>/'
				} ]
			}
		},
		express : {
			options : {
				port : process.env.PORT || 3000
			},
			dev : {
				options : {
					script : 'bin/www',
					debug : true
				}
			},
			prod : {
				options : {
					script : '<%%= yeoman.dist %>/bin/www',
					node_env : 'production',
				}
			}
		},
		open : {
			server : {
				url : 'http://localhost:<%%= express.options.port %>'
			}
		},
		watch : {
			dev : {
				files : [ 'client/css/**/*', 'client/images/**/*', 'server/views/**/*' ],
				tasks : [],
				options : {
					livereload : true,
				}
			}
		},
		jshint : {
			options : {
				jshintrc : 'client/scripts/.jshintrc',
				reporter : require('jshint-stylish')
			},
			server : [ 'server/**/*.js' ],
			client : [ 'client/scripts/**/*.js' ]
		},
		env : {
			test : {
				NODE_ENV : 'test'
			}
		},
		mochaTest : {
			test : {
				options : {
					reporter : 'spec',
					require : 'test/server/configs/blanket'
				},
				src : [ 'test/server/specs/**/*Spec.js' ]
			},
			coverage : {
				options : {
					reporter : 'html-cov',
					// use the quiet flag to suppress the mocha console output
					quiet : true,
					// specify a destination file to capture the mocha
					// output (the quiet option does not suppress this)
					captureFile : 'reporters/server/coverage.html'
				},
				src : [ 'test/server/specs/**/*Spec.js' ]
			}

		},
		karma : {
			unit : {
				configFile : 'test/client/configs/karma.conf.js',
				singleRun : true,
				reporters : [ 'progress', 'coverage' ],

				preprocessors : {
					// source files, that you wanna generate coverage for
					// do not include tests or libraries
					// (these files will be instrumented by Istanbul)
					'client/scripts/**/*.js' : [ 'coverage' ]
				},

				// optionally, configure the reporter
				coverageReporter : {
					type : 'html',
					dir : 'reporters/client/coverage/'
				}
			}
		}
	});

	grunt.registerTask('test', [ 'clean:test', 'env:test', 'mochaTest', 'karma' ]);

	grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
		this.async();
	});

	grunt.registerTask('build', [ 'clean:build', 'wiredep', 'useminPrepare', 'concat', 'copy', 'uglify', 'filerev', 'usemin' ]);

	grunt.registerTask('serve', function(target) {
		if (target === 'dist') {
			return grunt.task.run([ 'build', 'express:prod', 'open', 'express-keepalive' ]);
		}
		grunt.task.run([ 'wiredep', 'express:dev', 'open', 'watch:dev' ]);
	});
	grunt.registerTask('default', [ 'jshint:client', 'test', 'build' ]);
};