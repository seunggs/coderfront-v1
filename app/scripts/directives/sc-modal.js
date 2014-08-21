'use strict';

angular.module('coderfrontApp')
  .directive('scModal', function () {
    return {
			// Requires: _md-modal.sass to work
			// Usage: 
			// Put sc-modal attribute in a elements to fire up an alert modal
			// Two ways to open Modal window: 
			// 1) with click: don't include scModalOpen attribute; use it in DOM as attribute of a link
			// 2) without click: set scModalOpen attribute to true; use it in DOM as element - add it anywhere in html
			
			// Note: transclusion not allowed
			
			// Attr options: 
			// sc-modal-open: allows to open modal without a click - set it as 
			// sc-modal-text: 
			// sc-modal-yes: insert a function to be executed if the user clicks 'yes'
			// sc-modal-first-no: insert a function to be executed if the user clicks first 'no'
			// sc-modal-type: delete; overwrite; alert - default is delete

			scope: {
				'scModalYes': '&',
				'scModalNo': '&?',
				'scModalFirstNo': '&?',
				'scModalOpen': '=?', // ? makes it optional
				'scModalType': '='
			},
			restrict: 'AE',
			transclude: false,
			link: function(scope, elem, attr) {
				// If no type is given, set it at delete

				scope.updateModalType = function(type) {
					// change styling depending on scModalType (default is delete)
					if (type === 'delete') {
						angular.element('.md-content .btn-yes').text('Yes, delete.');
					} else if (type === 'alert') {
						angular.element('.md-content .btn-no').text('No.');
					} else if (type === 'overwrite') {
						angular.element('.md-content .btn-yes').text('Yes, overwrite.');
					}
				};
				
				scope.scModalText = attr.scModalText;
				scope.scModalHeading = attr.scModalHeading;

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

						// update the modal type
						scope.scModalType = attr.scModalType;
						console.log(scope.scModalType);
						scope.updateModalType(scope.scModalType);
					}
				});

				scope.closeModal = function() {
					scope.scModalOpen = false;
					scope.mdModalShow = false;
				};

				// watch mdModalShow and add or remove md-show class appropriately
				var mdModalElem = elem[0].children[0];

				scope.$watch('mdModalShow', function(value) {
					if (value === true) {
						angular.element(mdModalElem).addClass('md-show');
					} else if (value === false) {
						angular.element(mdModalElem).removeClass('md-show');
					}
				});

				// attr sc-modal-yes runs when user clicks 'yes'
				scope.yesAction = function() {
					scope.scModalYes();
				};

				// attr sc-modal-yes runs when user clicks 'yes'
				scope.noAction = function() {
					scope.scModalNo();
				};

				// attr sc-modal-insert runs when user clicks 'yes'
				scope.firstNoAction = function() {
					scope.scModalFirstNo();
				};
			},
			templateUrl: '../views/sc-modal.html'
    };
  });
