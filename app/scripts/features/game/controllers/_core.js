'use strict';
angular.module('app.game').controller('GamesCtrl', ['$scope', 'Restangular', '$log', function ($scope, Restangular, $log) {
    Restangular.all('awesomeThings').getList().then(function(result){
        $scope.awesomeThings = result;
        $log.info(result);
    });
}]);
