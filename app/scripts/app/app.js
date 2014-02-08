'use strict';

//dependencies
angular.module('ngAnalytics', ['angulartics.google.analytics', 'angulartics.scroll']);
angular.module('ngDeps', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
angular.module('ngExDeps', ['restangular', 'log.ex.uo', 'ngAnalytics', 'ui.bootstrap', 'pasvaz.bindonce', 'angularMoment',
                            'ui.router', 'ngStorage'
                           ]);
angular.module('lib.deps', ['ngExDeps', 'ngDeps']);

// app
var mainApp = angular.module('myApp', ['lib.deps']);

// preloaded tasks
mainApp.run([function () {
   FastClick.attach(document.body);
}]);

