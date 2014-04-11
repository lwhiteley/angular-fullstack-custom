'use strict';

angular.module('app.core').controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.menu = [{
          'title': 'Home',
          'link': '/'
        },
        {
          'title': 'Business',
          'link': '/business'
        },
        {
          'title': 'Games',
          'link': '/games'
        },
        {
          'title': 'Contact',
          'link': '#'
        }];

        $scope.isActive = function(route) {
          return route === $location.path();
        };
  }]);


angular.module('app.core').controller('MainCtrl', ['$scope', '$log', '$localStorage','awesomeThings',
  function ($scope, $log, $localStorage, awesomeThings ) {
    $scope.awesomeThings = awesomeThings;
    $log.info(awesomeThings);
    $scope.addSpecialWarnMessage = function() {
        $log.info('result: ', $localStorage.awesomeThings);
    };
}]);
