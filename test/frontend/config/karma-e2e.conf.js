// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    var files = require('./common/files');
    var specFiles = 'test/frontend/spec/e2e/**/*.js';
    files[files.length -1] = (specFiles);
    //files.unshift('app/bower_components/angular-scenario/angular-scenario.js');
 config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['ng-scenario'],

    // list of files / patterns to load in the browser
    files: files,

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9001,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Uncomment the following lines if you are using grunt's server to run the tests
     proxies: {
       '/': 'http://localhost:9000/'
     },
     //URL root prevent conflicts with the site root
     urlRoot: '_karma_',

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
      
  });
};
