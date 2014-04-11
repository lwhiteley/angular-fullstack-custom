/*global module */
module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta : {
            bin : {
                lintFiles : ['Gruntfile.js', 'config/*.js', 'test/**/*.js']
            }
        },
        jslint: {
            all : {
                src: '<%= meta.bin.lintFiles %>',
                options: { }
            }
        },
        karma: {
            options: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            stable: {
                configFile: 'config/karma.stable.conf.js'
            },
            unstable: {
                configFile: 'config/karma.unstable.conf.js'
            },
            minify: {
                configFile: 'config/karma.min.conf.js'
            }
        },
        watch: {
            files: '<%= meta.bin.lintFiles %>',
            tasks: ['jslint', 'karma:stable', 'notify:watch']
        },
        notify: {
            watch: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'Finish Linting & Running Tests' //required
                }
            }
        },
        uglify: {
            datespy: {
                files: {
                    'dest/datespy.min.js': ['js/src/datespy.js']
                }
            }
        },
        coveralls: {
            options: {
                coverage_dir: 'coverage'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['jslint', 'karma:stable']);
    grunt.registerTask('default', ['jslint', 'karma:stable', 'uglify', 'karma:minify', 'coveralls']);
    grunt.registerTask('release', ['uglify', 'karma:minify']);

};
