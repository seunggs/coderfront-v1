'use strict';

describe('Service: texteditor', function () {

  // load the service's module
  beforeEach(module('coderfrontApp'));

  // instantiate service
  var texteditor;
  beforeEach(inject(function (_texteditor_) {
    texteditor = _texteditor_;
  }));

  it('should do something', function () {
    expect(!!texteditor).toBe(true);
  });

});
