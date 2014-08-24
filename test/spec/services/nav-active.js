'use strict';

describe('Service: navActive', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var navActive;
  beforeEach(inject(function (_navActive_) {
    navActive = _navActive_;
  }));

  it('should do something', function () {
    expect(!!navActive).toBe(true);
  });

});
