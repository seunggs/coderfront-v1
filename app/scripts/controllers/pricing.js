'use strict';

angular.module('coderfrontApp')
  .controller('PricingCtrl', function ($scope, Stripe, FIREBASE_URL, $firebaseSimpleLogin, $firebase, $location, $timeout) {
		// Wrapper object
		$scope.pricing = {};
		$scope.pricing.stripeOptions = {};

		// Button control
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Initialize enable buy button
		$scope.pricing.enableBuyBtn = false;

		// Modal control
		$scope.pricing.modalOpen = false;

		// Determine the checkout flow based on the user's login status
		// First, get user uid
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
				// The user is either first sent to login or 
				// to checkout immediately based on their login status
				if(user === null) {
					$scope.pricing.signedIn = false;

					// Enable buy button
					$scope.pricing.enableBuyBtn = true;
				} else {
					$scope.pricing.signedIn = true;
					$scope.pricing.user = user;

					// Get userData
					var userDataRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
					var userData = $firebase(userDataRef);
					var userDataObj = userData.$asObject();

					userDataObj.$loaded()
						.then(function(){
							$scope.pricing.userData = userData;
							$scope.pricing.userDataObj = userDataObj;

							// Once all this is done, enable buy button
							$scope.pricing.enableBuyBtn = true;
						});
				}

			});

		// Stripe checkout
		$scope.pricing.openCheckout = function() {
			$scope.btn.loading = true; // button control
			if($scope.pricing.signedIn === false) {
				// Button control
				$scope.pricing.modalOpen = true;

				$scope.btn.loading = false;
				$scope.btn.success = true;
				btnReset(1000);
			} else if ($scope.pricing.signedIn === true) {
				// MANUALLY ENTERED AT THE MOMENT
				$scope.pricing.stripeOptions.courseName = 'Coderfront Flagship Course';
				$scope.pricing.stripeOptions.courseId = '-JSVZ60GI88cMkm3kpjy';
				$scope.pricing.stripeOptions.price = 500;
				$scope.pricing.stripeOptions.email = $scope.pricing.user.email;

				Stripe.buy($scope.pricing.stripeOptions)
					.then(function() {
						// Success callback
						console.log('Successfully charged through Stripe');

						// Add course to userData
						if($scope.pricing.userDataObj.courses === undefined) {
							$scope.pricing.userDataObj.courses = {};
							$scope.pricing.userDataObj.courses[$scope.pricing.stripeOptions.courseId] = true;
							$scope.pricing.userDataObj.$save();
						} else {
							$scope.pricing.userDataObj.courses[$scope.pricing.stripeOptions.courseId] = true;
							$scope.pricing.userDataObj.$save();
						}

						// Set last viewed to welcome page since this is the first time viewing the unit
						// Since there's no lastViewed, create one
						$scope.pricing.userDataObj.lastViewed = {};

						$scope.pricing.lastViewed = {
							courseId: $scope.pricing.stripeOptions.courseId,
							unitId: 'NA',
							lessonId: 'NA'
						};
						
						$scope.pricing.userData.$update({lastViewed: $scope.pricing.lastViewed})
							.then(function() {
								console.log('successfully updated last viewed course, unit and lesson');
							}, function() {
								console.log('failed to updated last viewed course, unit and lesson');
							});

						// Relocate the user to the 'thank you' page with courseId attached
						var thankyouPath = '/thankyou/' + $scope.pricing.stripeOptions.courseId;
						console.log(thankyouPath);
						$location.path(thankyouPath);

					}, function() {
						// Error callback
						console.log('Error charging through Stripe');
					});

				// Button control if Stripe Checkout window is closed
				$scope.$on('stripeCheckoutClosed', function(event, data) {
					if(data === false) {
						$scope.btn.loading = false;
						btnReset(1000);
						$scope.$apply();
					}
				});

			}

		};

		$scope.pricing.sendTo = function(location) {
			if(location === 'login') {
				$location.path('/login');
			} else if (location === 'register') {
				$location.path('/register');
			}
		};
  });
