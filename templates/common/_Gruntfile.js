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
		wiredep : {
			target : {
				src : 'views/index.html', // point to your HTML file.
				ignorePath : '../public/'
			}
		},
		clean : [ '<%%= yeoman.dist %>', '.tmp' ],
		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin : {
			html : [ '<%%= yeoman.dist %>/views/index.html' ],
			options : {
				assetsDirs : [ '<%%= yeoman.dist %>/public' ]
			}
		},
		filerev : {
			main : {
				src : [ '<%%= yeoman.dist %>/public/javascripts/**/*.js' ]
			}
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
		},
		express : {
			options : {
				port : process.env.PORT || 3000
			},
			dev : {
				options : {
					script : 'app.js',
					debug : true
				}
			},
			prod : {
				options : {
					script : '<%%= yeoman.dist %>/app.js',
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
				files : [ 'public/stylesheets/**/*', 'public/images/**/*', 'views/**/*' ],
				tasks : [],
				options : {
					livereload : true,
				}
			}
		},
		jshint : {
			options : {
				jshintrc : 'public/javascripts/.jshintrc',
				reporter : require('jshint-stylish')
			},
			server : [ 'app.js', 'config/**/*.js', 'routes/**/*.js' ],
			client : [ 'public/javascripts/**/*.js' ],
			all : [ 'app.js', 'config/**/*.js', 'routes/**/*.js', 'public/**/*.js' ],
			test : []
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
					require : 'test/server/blanket'
				},
				src : [ 'test/server/**/*Spec.js' ]
			},
			coverage : {
				options : {
					reporter : 'html-cov',
					// use the quiet flag to suppress the mocha console output
					quiet : true,
					// specify a destination file to capture the mocha
					// output (the quiet option does not suppress this)
					captureFile : 'coverage.html'
				},
				src : [ 'test/server/**/*Spec.js' ]
			}

		},
		karma : {
			unit : {
				configFile : 'test/karma.conf.js',
				singleRun: true,
				reporters: ['progress', 'coverage'],

			    preprocessors: {
			      // source files, that you wanna generate coverage for
			      // do not include tests or libraries
			      // (these files will be instrumented by Istanbul)
			      'public/javascripts/**/*.js': ['coverage']
			    },

			    // optionally, configure the reporter
			    coverageReporter: {
			      type : 'html',
			      dir : 'coverage/'
			    }
			}
		}
	});

	grunt.registerTask('test', [ 'env:test', 'mochaTest' , 'karma']);

	grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
		this.async();
	});

	grunt.registerTask('build', [ 'clean', 'wiredep', 'useminPrepare', 'concat', 'copy', 'uglify', 'filerev', 'usemin' ]);

	grunt.registerTask('serve', function(target) {
		if (target === 'dist') {
			return grunt.task.run([ 'build', 'express:prod', 'open', 'express-keepalive' ]);
		}
		grunt.task.run([ 'wiredep', 'express:dev', 'open', 'watch:dev' ]);
	});
	grunt.registerTask('default', [ 'jshint:client', 'test', 'build' ]);
};