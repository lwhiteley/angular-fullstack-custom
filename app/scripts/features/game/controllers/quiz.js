'use strict';

angular.module('app.game').controller('QuizCtrl', ['$scope', 'Restangular', '$log', function ($scope, Restangular, $log) {
    $scope.quizScore = 100;
    $scope.quizOptions =['Single Player'];
}]);
