'use strict';

// app features
// (all features inherit 'app.core'; no need to add as dependency here)
angular.module('app.features', ['app.game', 'app.travel']);

// app
var app = angular.module('app', ['app.features']);

// preloaded tasks
app.run([function () {
   FastClick.attach(document.body);
}]);
