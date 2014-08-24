'use strict';

angular.module('coderfrontApp')
  .controller('PricingCtrl', function ($scope, Stripe, Auth, User, $location, $timeout) {
		// Wrapper object
		$scope.wpr = {};
		$scope.wpr.stripeOptions = {};

		// Button control
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Initialize enable buy button
		$scope.wpr.enableBuyBtn = false;

		// Modal control
		$scope.wpr.modalOpen = false;

		// Determine the checkout flow based on the user's login status
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;

				// Once user data object is loaded, enable buy button
				$scope.wpr.enableBuyBtn = true;
			}, function() {
				// Enable buy button
				$scope.wpr.enableBuyBtn = true;
			});

		// Stripe checkout
		$scope.wpr.openCheckout = function() {
			$scope.btn.loading = true; // button control

			// First see if the user is signed in
			Auth.signedIn()
				.then(function() {
					// MANUALLY ENTERED AT THE MOMENT
					$scope.wpr.stripeOptions.courseName = 'Coderfront Flagship Course';
					$scope.wpr.stripeOptions.courseId = '-JSVZ60GI88cMkm3kpjy';
					$scope.wpr.stripeOptions.price = 500;
					$scope.wpr.stripeOptions.email = $scope.wpr.userDataObj.email;

					Stripe.buy($scope.wpr.stripeOptions)
						.then(function() {
							// Success callback
							console.log('Successfully charged through Stripe');

							// Add course to userData
							if($scope.wpr.userDataObj.courses === undefined) {
								$scope.wpr.userDataObj.courses = {}; // create courses obj if it doesn't exist
							}

							$scope.wpr.userDataObj.courses[$scope.wpr.stripeOptions.courseId] = true;

							// Set last viewed to welcome page since this is the first time viewing the unit
							$scope.wpr.userDataObj.lastViewed = {
								courseId: $scope.wpr.stripeOptions.courseId,
								unitId: 'NA',
								lessonId: 'NA'
							};
							
							// Update userDataObj with 1) course added and 2) last view updated
							User.update($scope.wpr.userDataObj)
								.then(function() {
									console.log('successfully updated last viewed course');
								}, function() {
									console.log('failed to updated last viewed course');
								});

							// Relocate the user to the 'thank you' page with courseId attached
							var thankyouPath = '/thankyou/' + $scope.wpr.stripeOptions.courseId;
							$location.path(thankyouPath);

						}, function() {
							// Error callback
							console.log('Error charging through Stripe');
						});

					// Loading button closed if Stripe Checkout window is closed
					$scope.$on('stripeCheckoutClosed', function(event, data) {
						if(data === false) {
							$scope.btn.loading = false;
							btnReset(1000);
							$scope.$apply();
						}
					});

				}, function() {
					// Button control
					$scope.wpr.modalOpen = true;

					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);
				});

		};

		$scope.wpr.sendTo = function(location) {
			if(location === 'login') {
				$location.path('/login');
			} else if (location === 'register') {
				$location.path('/register');
			}
		};
  });
