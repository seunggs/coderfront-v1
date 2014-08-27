'use strict';

describe('Controller: ThankyouSubscriberCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var ThankyouSubscriberCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThankyouSubscriberCtrl = $controller('ThankyouSubscriberCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
