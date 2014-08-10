'use strict';

angular.module('coderfrontApp')
  .directive('scPageLoading', function () {
		// Requires 'page-loading', 'show-page-loading', 'icon-loading-lg' class
		// Attr: pageLoading -> show page loading when it's true
		// Ex usage: <sc-page-loading page-loading="pageLoading"></sc-page-loading>
    return {
      restrict: 'E',
      scope: {
				pageLoading: '='
      },
      template: '<div class="page-loading" ng-class="{\'show-page-loading\': pageLoading}"><div class="icon-loading-lg absolute-center"></div></div>'
    };
  });
