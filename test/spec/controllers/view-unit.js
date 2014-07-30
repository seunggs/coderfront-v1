'use strict';

describe('Controller: ViewUnitCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var ViewUnitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewUnitCtrl = $controller('ViewUnitCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
