'use strict';

angular.module('coderfrontApp')
  .directive('scModal', function () {
    return {
			// Requires: _md-modal.sass to work
			// Usage: 
			// 1) Put sc-modal attribute in a elements to fire up an alert modal
			// 2) Set scModalOpen attribute to true
			
			// Attr options: 
			// sc-modal-yes: insert a function to be executed if the user clicks 'yes'
			// sc-modal-first-no: insert a function to be executed if the user clicks first 'no'
			// sc-modal-type: delete; warning; overwrite; login - default is delete

			scope: {
				'scModalYes': '&',
				'scModalFirstNo': '&',
				'scModalOpen': '=?', // ? makes it optional
				'scModalText': '@',
				'scModalType': '@'
			},
			restrict: 'A',
			link: function(scope, elem) {

				// change styling depending on scModalType (default is delete)
				if(scope.scModalType === 'warning') {
					angular.element('.md-content').css('background-color', '#efa440');
					angular.element('.md-overlay').css('background-color', 'rgba(145,108,32,0.8)');
					angular.element('.md-content button').removeClass('btn-red').addClass('btn-orange-yellow');
				} else if(scope.scModalType === 'overwrite') {
					angular.element('.md-content button:first').text('Yes, overwrite.');
				}

				// Two ways to open Modal window: with click...
				elem.on('click', function(e) {
					// this prevents click event from firing when user clicks on descendent elements
					if(e.target !== this) {
						return;
					}

					scope.$apply(function() {
						scope.mdModalShow = true;
					});
				});

				// ...or with scModalOpen attribute set to true
				scope.$watch('scModalOpen', function(value) {
					if (value === true) {
						scope.mdModalShow = true;
					}
				});

				scope.closeModal = function() {
					scope.scModalOpen = false;
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

				// attr sc-modal-insert runs when user clicks 'yes'
				scope.firstNoAction = function() {
					scope.scModalFirstNo();
				};
			},
			templateUrl: '../views/sc-modal.html'
    };
  });
