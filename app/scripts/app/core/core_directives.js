'use strict';

mainApp.directive('setBrowserTitle', ['$log', 'BrowserTitleService', function($log, BrowserTitleService){
	//directive properties
	var linkProp = function(scope, elm, attrs){
		BrowserTitleService.setBrowserTitle(attrs.setBrowserTitle);
	};

	//directive declaration
	var directive = {
			link: linkProp
	};

	return directive;
}]);