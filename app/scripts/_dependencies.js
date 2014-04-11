'use strict';

//dependencies
// 'lib.deps' is a dependency of 'app.core'
angular.module('ngAnalytics', ['angulartics.google.analytics', 'angulartics.scroll']);
angular.module('ngDeps', ['ngCookies', 'ngSanitize', 'ngAnimate', 'ngTouch']);
angular.module('ngExDeps', ['restangular', 'log.ex.uo', 'ngAnalytics', 'ui.bootstrap',
                            'pasvaz.bindonce', 'angularMoment',
                            'ui.router', 'ngStorage', 'toaster'
                           ]);
angular.module('lib.deps', ['ngExDeps', 'ngDeps']);
