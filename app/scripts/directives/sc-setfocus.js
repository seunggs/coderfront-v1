'use strict';

angular.module('coderfrontApp')
  .directive('scSetfocus', function () {
		// Use as attribute only
		// Attr:
		// 1) setfocus: binding for a scope variable to toggle focus
		// Ex usage: <div sc-setfocus setfocus="register.step1Focus"></div>
    return {
      restrict: 'A',
      scope: {
				setfocus: '='
      },
      link: function(scope, elem) {
        if(scope.setfocus === true) {
					angular.element(elem[0]).focus();
        }
      }
    };
  });
