'use strict';

angular.module('app.core').service('CoreServices', ['BrowserTitleService', function(BrowserTitleService){
    var service = {
        BrowserTitleService: BrowserTitleService
    };

    return service;
}]);

angular.module('app.core').service('BrowserTitleService', [function(){
    var setBrowserTitle = function(title){
        $('title').text(title);
    };

    var service = {
        setBrowserTitle: setBrowserTitle
    };

    return service;
}]);
