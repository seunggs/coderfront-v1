'use strict';

describe('Directive: scDndList', function () {

  // load the directive's module
  beforeEach(module('coderfrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sc-dnd-list></sc-dnd-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scDndList directive');
  }));
});
