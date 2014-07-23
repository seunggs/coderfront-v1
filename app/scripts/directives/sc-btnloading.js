'use strict';

angular.module('coderfrontApp')
  .directive('scBtnLoading', function () {
    return {
			// only works with Font Awesome
			// Attr options:
      // loadingToggle: variable to toggle loading in view/controller (i.e. btn.loading)
			scope: {
        loadingToggle: '='
      },
      restrict: 'E',
      transclude: true,
      template: '<span ng-if="loading-toggle"><i class="fa fa-circle-o-notch fa-spin"></i>' +
				'&nbsp;&nbsp;Loading...</span><span ng-if="!loading-toggle"><div ng-transclude></div></span>'
    };
  });
