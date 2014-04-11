'use strict';

// values
angular.module('app.core').value('CoreValues', (function () {
    var value = {
        appName: 'fiyuh'
    };
    return  value;
})());


//constants
angular.module('app.core').constant('UrlConstants', (function () {
    var constant = {
        home: '/',
        games: '/games',
        travel: '/travel'
    };
    return constant;
})());
