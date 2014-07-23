'use strict';

angular.module('coderfrontApp')
  .directive('scModal', function () {
    return {
			// Requires _md-modal.sass to work
			// Usage: put sc-modal attribute in a elements to fire up an alert modal
			// Attr options: 
			// sc-modal-yes: insert a function to be executed if the user clicks 'yes'
			// sc-modal-type: delete; warning; login - default is delete

			scope: {
				'scModalYes': '&'
			},
			restrict: 'A',
			link: function(scope, elem) {
				elem.on('click', function(e) {
					// this prevents click event from firing when user clicks on descendent elements
					// i.e. click shouldn't fire on close button element 
					if(e.target !== this) {
						return;
					}

					scope.$apply(function() {
						scope.mdModalShow = true;
					});
				});

				scope.closeModal = function() {
					scope.mdModalShow = false;
				};

				// watch mdModalShow and add or remove md-show class appropriately
				scope.$watch('mdModalShow', function(value) {
					if (value === true) {
						angular.element(elem[0].children[0]).addClass('md-show');
					} else if (value === false) {
						angular.element(elem[0].children[0]).removeClass('md-show');
					}
				});

				// attr sc-modal-yes runs when user clicks 'yes'
				scope.yesAction = function() {
					scope.scModalYes();
				};

			},
			templateUrl: '../views/sc-modal.html'
    };
  });
