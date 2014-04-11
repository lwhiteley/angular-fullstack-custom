'use strict';
// routes
angular.module('app.game').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('games',{
       url: '/games',
       templateUrl: 'partials/game/games',
       controller: 'GamesCtrl'
     });
   $stateProvider.state('games.quiz',{
       url: '/:game',
       templateUrl: 'partials/game/quiz',
       controller: 'QuizCtrl'
     });
  }]);
