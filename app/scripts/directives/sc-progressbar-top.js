'use strict';

angular.module('coderfrontApp')
  .directive('scProgressbarTop', function ($timeout) {
		// Draws a progress bar 
		// Attr:
		// 1) progressWidth: binds to a scope that controls width of the progressbar
		// Ex usage. <sc-progressbar-top progress-width="register.progress"></sc-progressbar-top>
    return {
      restrict: 'E',
      scope: {
				progressWidth: '='
      },
      link: function(scope) {

				// Initialize custom progress bar style 
				var progressbarTopCss = {
					'position': 'fixed',
					'top': '0',
					'left': '0',
					'width': '0',
					'background-color': 'rgba(255,255,255,0.35)',
					'height': '6px',
					'transition': 'width 0.5s',
					'-webkit-transition': 'width 0.5s',
				};
				angular.element('.progressbar-top').css(progressbarTopCss);

				// Control width with scope.progress
				scope.$watch('progressWidth', function(val) {
					$timeout(function() {
						angular.element('.progressbar-top').css('width', (val * 100).toString() + '%');
					}, 600);
				});

      },
      template: '<div class="progressbar-top"></div>'
    };
  });
