'use strict';

describe('Controller: EditUnitCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var EditUnitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditUnitCtrl = $controller('EditUnitCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
