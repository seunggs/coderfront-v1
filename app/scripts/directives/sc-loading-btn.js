'use strict';

angular.module('coderfrontApp')
  .directive('scLoadingBtn', function ($timeout) {
    return {
			// Requires: Font Awesome, _animation-custom.sass, _custom-buttons.sass (.btn-bg-sucess, .btn-bg-error)
      // Other requirements: Element type must be 'submit'
			// Attr options:
      // success (required): a variable
      // loading (required): a variable
      // btnClass: i.e. btn-primary - default: btn-sc btn-loading btn-primary
      // btnType: 1) survey; 2) solid - default: solid
      // Ex usage: <sc-loading-btn success="addUnit.success" loading="addUnit.loading" btn-type="solid" btn-class="btn-sc btn-loading btn-primary">BUTTON TEXT</sc-loading-btn>
			scope: {
        loading: '=',
        success: '=',
        btnType: '@?',
        btnClass: '@'
      },
      restrict: 'E',
      transclude: true,
      link: function(scope, elem) {
        // Set default for button class
        scope.btnClass = scope.btnClass !== undefined ? scope.btnClass : 'btn-sc btn-loading btn-primary';

        angular.element(elem[0].firstChild).addClass(scope.btnClass);

        // Set default for button type
        scope.btnType = scope.btnType !== undefined ? scope.btnType : 'solid';

        var translateYMixin = function(y) {
          return {
            '-webkit-transform': 'translateY(' + y + '%)',
            '-moz-transform': 'translateY(' + y + '%)',
            '-ms-transform': 'translateY(' + y + '%)',
            '-o-transform': 'translateY(' + y + '%)',
            'transform': 'translateY(' + y + '%)'
          };
        };

        // Button reset
        var resetButton = function(delay) {
          $timeout(function(){
            // reset the button
            angular.element('.btn-partial-success').css('top', '-100%');
            angular.element('.btn-partial-loading').css('top', '-100%');
            angular.element('.btn-partial-error').css('top', '-100%');
            angular.element('.loading-btn-text').css(translateYMixin(0));
            angular.element(elem[0].firstChild).removeClass('btn-bg-success');
            angular.element(elem[0].firstChild).removeClass('btn-bg-error');
            angular.element(elem[0].firstChild).removeClass('animated shake-fast');
            angular.element(elem[0].firstChild).blur();
          }, delay);
        };

        // Fire up loading message
        scope.$watch('loading', function(value) {
          if (value === true) {
            angular.element('.btn-partial-loading').css('top', '0');
            angular.element('.loading-btn-text').css(translateYMixin(300));
          }
        });

        // Fire up success/error icon
        scope.$watch('success', function(value) {
          if (value === true) {
            angular.element('.btn-partial-loading').css('top', '-100%');
            angular.element('.btn-partial-success').css('top', '0');
            if (scope.btnType === 'solid') {
              angular.element(elem[0].firstChild).addClass('btn-bg-success');
            }
            resetButton(1000);
          } else if (value === false) {
            angular.element(elem[0].firstChild).addClass('animated shake-fast');
            angular.element('.btn-partial-loading').css('top', '-100%');
            angular.element('.btn-partial-error').css('top', '0');
            if (scope.btnType === 'solid') {
              angular.element(elem[0].firstChild).addClass('btn-bg-error');
            }
            resetButton(1000);
          }
        }, true);

      },
      templateUrl: '../views/sc-loading-btn.html'
    };
  });
