'use strict';

describe('Directive: scLoginBtn', function () {

  // load the directive's module
  beforeEach(module('coderfrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sc-login-btn></sc-login-btn>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scLoginBtn directive');
  }));
});
