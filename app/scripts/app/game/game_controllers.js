'use strict';
mainApp.controller('GamesCtrl', ['$scope', 'Restangular', '$log', function ($scope, Restangular, $log) {
    Restangular.all('awesomeThings').getList().then(function(result){
        $scope.awesomeThings = result;
        $log.info(result);
    });
}]);

