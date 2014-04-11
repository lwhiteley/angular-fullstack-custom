'use strict';

// config
app.config(['DeviceProvider', function (DeviceProvider) {
    if(Modernizr && Modernizr.touch){
        DeviceProvider.setTouchDevice(true);
    }
  }]);

// api
app.config(['RestangularProvider','$analyticsProvider', function (RestangularProvider, $analyticsProvider) {
    RestangularProvider.setBaseUrl('/api');
    $analyticsProvider.virtualPageviews(true);

  }]);

// logging
app.config(['logExProvider', function (logExProvider) {
    logExProvider.enableLogging(true);
  }]);

// routes
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
//      $stateProvider.otherwise({
//        redirectTo: '/'
//      });
    $locationProvider.html5Mode(true);
  }]);
