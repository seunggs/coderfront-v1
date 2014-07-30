'use strict';

describe('Controller: AdminFooterCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var AdminFooterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminFooterCtrl = $controller('AdminFooterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
