'use strict';

describe('Controller: NavMemberCtrl', function () {

  // load the controller's module
  beforeEach(module('coderfrontApp'));

  var NavMemberCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavMemberCtrl = $controller('NavMemberCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
