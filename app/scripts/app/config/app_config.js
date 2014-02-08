'use strict';

// config
mainApp.config(['DeviceProvider', function (DeviceProvider) {
    if(Modernizr && Modernizr.touch){
        DeviceProvider.setTouchDevice(true);
    }
    //$bottleProvider.setApiUrl('things',  'http://localhost:9000/api/:slug');
  }]);

// api
mainApp.config(['RestangularProvider','$analyticsProvider', function (RestangularProvider, $analyticsProvider) {
    RestangularProvider.setBaseUrl('/api');
    $analyticsProvider.virtualPageviews(true);

  }]);

// logging
mainApp.config(['logExProvider', function (logExProvider) {
    //disable when going to production
    //TODO: setup grunt task for this
    logExProvider.enableLogging(true);
  }]);

// routes - old
mainApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/core/main',
        controller: 'MainCtrl'
      });
     $routeProvider.when('/games', {
        templateUrl: 'partials/game/games',
        controller: 'GamesCtrl'
      });
      $routeProvider.otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
