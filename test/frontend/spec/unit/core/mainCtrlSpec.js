'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module

  beforeEach(module('app.core'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    var fakeRoute = ['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express'];
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      awesomeThings: fakeRoute
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(4);
    //done();
  });
});
