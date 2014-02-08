'use strict';

mainApp.service('CoreServices', ['BrowserTitleService', function(BrowserTitleService){
    var service = {
        BrowserTitleService: BrowserTitleService
    };

    return service;
}]);

mainApp.service('BrowserTitleService', [function(){
    var setBrowserTitle = function(title){
        $('title').text(title);
    };

    var service = {
        setBrowserTitle: setBrowserTitle
    };

    return service;
}]);
