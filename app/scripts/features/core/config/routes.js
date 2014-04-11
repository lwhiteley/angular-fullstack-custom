'use strict';
// routes
angular.module('app.core').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home',{
        url: '/',
        templateUrl: 'partials/core/main',
        controller: 'MainCtrl',
        resolve:{
          awesomeThings: ['Restangular', function(Restangular){
            return Restangular.all('awesomeThings').getList();
          }]
        }
      });
  }]);
