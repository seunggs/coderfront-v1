'use strict';

angular.module('coderfrontApp')
  .directive('scLoadingBtn', function ($timeout) {
    return {
			// Requires: Font Awesome, _animation-custom.sass, _sc-loading-btn.sass
      // Other requirements: Element type must be 'submit'
			// Attr options:
      // success (required): a variable
      // loading (required): a variable
      // btnColorClass: i.e. btn-primary - default: btn-primary
      // Ex usage: <sc-loading-btn success="addUnit.success" loading="addUnit.loading" btnColorClass="btn-primary">BUTTON TEXT</sc-loading-btn>
			scope: {
        loading: '=',
        success: '=',
        btnColorClass: '@'
      },
      restrict: 'E',
      transclude: true,
      link: function(scope, elem) {
        // Add btn-color if the attribute exists
        if (scope.btnColorClass === undefined) {
          scope.btnColorClass = 'btn-primary';
        }
        
        angular.element(elem[0].firstChild).addClass(scope.btnColorClass);

        var translateYMixin = function(y) {
          return {
            '-webkit-transform': 'translateY(' + y + '%)',
            '-moz-transform': 'translateY(' + y + '%)',
            '-ms-transform': 'translateY(' + y + '%)',
            '-o-transform': 'translateY(' + y + '%)',
            'transform': 'translateY(' + y + '%)'
          };
        };

        // Fire up loading message
        scope.$watch('loading', function(value) {
          if (value === true) {
            angular.element('.btn-partial-loading').css('top', '0');
            angular.element('.btn-loading span').css(translateYMixin(300));
          }
        });

        // Button reset
        var resetButton = function(delay) {
          $timeout(function(){
            // reset the button
            angular.element('.btn-partial-success').css('top', '-100%');
            angular.element('.btn-partial-loading').css('top', '-100%');
            angular.element('.btn-partial-error').css('top', '-100%');
            angular.element('.btn-loading span').css(translateYMixin(0));
            angular.element(elem[0].firstChild).removeClass('animated shake-fast');
            angular.element(elem[0].firstChild).blur();
            console.log('button styling reset ok');
          }, delay);
        };

        // Fire up success/error icon
        scope.$watch('success', function(value) {
          if (value === true) {
            angular.element('.btn-partial-loading').css('top', '-100%');
            angular.element('.btn-partial-success').css('top', '0');
            angular.element('.btn-partial-success').css('background-color', '#51c000');
            resetButton(1000);
          } else if (value === false) {
            angular.element(elem[0].firstChild).addClass('animated shake-fast');
            angular.element('.btn-partial-loading').css('top', '-100%');
            angular.element('.btn-partial-error').css('top', '0');
            angular.element('.btn-partial-error').css('background-color', '#cb362e');
            resetButton(1000);
          }
        });

      },
      templateUrl: '../views/sc-loading-btn.html'
    };
  });
