// Generated on 2014-01-11 using generator-angular-fullstack 1.1.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
    var port = (process.env.PORT || 9000);
    var portAsString = '' + port;
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'public',
      views: 'views',
        port: port
    },
    shell: {
        mongo: {
            command: 'mongod',
            options: {
                async: true
            }
        }
    },
    express: {
      options: {
        port: port
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= yeoman.port %>'
      }
    },
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js',
                '<%= yeoman.app %>/scripts/**/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/frontend/spec/**/{,*/}*.js'],
        tasks: ['karma:unit']
      },
      backendTest: {
        files: ['test/backend/**/{,*/}*.js'],
        tasks: ['mochacov']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/<%= yeoman.views %>/{,*//*}*.{html,jade}',
          '<%= yeoman.app %>/<%= yeoman.views %>/partials/{,*//*}*.{html,jade}',
          '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js',
          '<%= yeoman.app %>/scripts/**/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],

        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server.js',
          'lib/{,*//*}*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js',
          '<%= yeoman.app %>/scripts/**/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/{,*/}*.js',
              'test/backend/**/{,*/}*.js',
              'test/frontend/spec/**/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.views %>/*',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      heroku: {
        files: [{
          dot: true,
          src: [
            'heroku/*',
            '!heroku/.git*',
            '!heroku/Procfile'
          ]
        }]
      },
      server: '.tmp',
      coverage: 'test/coverage/frontend/',
      backendCoverage: 'test/coverage/backend/'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        src: ['<%= yeoman.app %>/views/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      }
    },



    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
           // '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.app %>/<%= yeoman.views %>/index.html',
             '<%= yeoman.app %>/<%= yeoman.views %>/index.jade'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: [
             '<%= yeoman.views %>/**/{,*/}*.html',
             '<%= yeoman.views %>/**/{,*/}*.jade',
             '<%= yeoman.views %>/{,*/}*.html',
             '<%= yeoman.views %>/{,*/}*.jade'
            ],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          //collapseWhitespace: true,
          //collapseBooleanAttributes: true,
          //removeCommentsFromCDATA: true,
          //removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/<%= yeoman.views %>',
          src: ['*.html', 'partials/**/*.html'],
          dest: '<%= yeoman.views %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.views %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/**/*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/<%= yeoman.views %>',
          dest: '<%= yeoman.views %>',
          src: '**/*.jade',
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      heroku: {
        files: [{
          expand: true,
          dot: true,
          dest: 'heroku',
          src: [
            '<%= yeoman.dist %>/**',
            '<%= yeoman.views %>/**'
          ]
        }, {
          expand: true,
          dest: 'heroku',
          src: [
            'package.json',
            'server.js',
            'lib/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/frontend/config/karma.conf.js',
        singleRun: true
      },
        e2e: {
        configFile: 'test/frontend/config/karma-e2e.conf.js',
        singleRun: true
      }
    },
  //instrumented files in (package.json).config
  mochacov: {
    options: {
        files: [
            'test/backend/helpers/globals.js',
            'test/backend/spec/**/*.js'
        ],
        require: ['should'],
            ui: "bdd"
    },
    test: {
        options:{
            reporter: 'spec'
        }
    },
    coverage: {
        options:{
            instrument: true,
            reporter: 'html-cov',
            output: 'test/coverage/backend/coverage.html'
        }
    }
  },
   wait: {
        options: {
            delay: 600
        },
        pause: {
            options: {
                before : function(options) {
                    console.log('Waiting on MongoDB to start: pausing %dms', options.delay);
                },
                after : function() {
                    console.log('pause end');
                }
            }
        },
        random: {
            options: {
                delay: 10,
                after : function() {
                    console.log('gamble');
                    return Math.random() < 0.05 ? false : true;
                }
            }
        }
   }


  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('mongo', [
      'shell:mongo',
      'wait:pause'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'mongo',
      'clean:server',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

 grunt.registerTask('test-backend', [
    //'mongo',
    //'clean:backendCoverage',
    'mochacov'
  ]);
  grunt.registerTask('test-ci', [
    'clean:server',
    'clean:coverage',
    'concurrent:test',
    'autoprefixer',
    'test-backend',
    'karma:unit'
  ]);

  grunt.registerTask('test', [
    'test-ci',
    'karma:e2e'
  ]);

  grunt.registerTask('build', [
    'test-ci',
    'clean:dist',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('heroku', [
    'build',
    'clean:heroku',
    'copy:heroku'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
