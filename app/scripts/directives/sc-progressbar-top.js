'use strict';

angular.module('coderfrontApp')
  .directive('scProgressbarTop', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the scProgressbarTop directive');
      }
    };
  });
