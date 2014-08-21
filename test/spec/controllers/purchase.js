'use strict';

describe('Controller: PurchaseCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var PurchaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PurchaseCtrl = $controller('PurchaseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
