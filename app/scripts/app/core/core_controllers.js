'use strict';

mainApp.controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
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


mainApp.controller('MainCtrl', ['$scope', 'Restangular', '$log', '$localStorage', function ($scope, Restangular, $log, $localStorage ) {

    Restangular.all('awesomeThings').getList().then(function(result){
        $scope.awesomeThings = result;
        $log.info(result);

        $localStorage.awesomeThings= $scope.awesomeThings;
    });
    $scope.addSpecialWarnMessage = function() {

             $log.info('result: ', $localStorage.awesomeThings);

    };
}]);
