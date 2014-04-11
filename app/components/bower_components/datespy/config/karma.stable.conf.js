/*global module */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            'js/lib/angular/angular-stable-latest.js',
            'js/lib/angular/angular-stable-mocks.js',
            'js/src/datespy.js',
            'test/spec/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],
        coverageReporter : {
            type : 'lcov',
            dir : 'coverage/'
        },
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '**/datespy.js': ['coverage']
        }
    });
};
