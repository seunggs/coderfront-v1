'use strict';

describe('Service: subscriber', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var subscriber;
  beforeEach(inject(function (_subscriber_) {
    subscriber = _subscriber_;
  }));

  it('should do something', function () {
    expect(!!subscriber).toBe(true);
  });

});
