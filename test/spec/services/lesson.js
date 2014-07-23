'use strict';

describe('Service: lesson', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var lesson;
  beforeEach(inject(function (_lesson_) {
    lesson = _lesson_;
  }));

  it('should do something', function () {
    expect(!!lesson).toBe(true);
  });

});
