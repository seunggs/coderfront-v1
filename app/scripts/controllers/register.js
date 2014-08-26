'use strict';

angular.module('coderfrontApp')
  .controller('RegisterCtrl', function ($scope, $timeout, $window, Auth, User) {

		// Wrapper object
		$scope.wpr = {};
		$scope.formData = {};
		$scope.msg = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Initialize focus
		$scope.wpr.focus = {
			step1: true
		};

    // Step control
    $scope.wpr.totalSteps = 2;
    $scope.wpr.step = 1; // initialize first step

    $scope.wpr.showStep = function(step) {
			$scope.wpr.step = step;
	
	    // Set top progressbar width
			$scope.wpr.progressWidth = ($scope.wpr.step-1) / $scope.wpr.totalSteps;

			// Set focus 
			$scope.wpr.focus.step1 = false;
			$scope.wpr.focus.step2 = true;
		};

		// Check if password = confirmPassword
		var checkConfirmPassword = function() {
			return $scope.formData.user.password === $scope.formData.confirmPassword ? true : false;
		};

		// Create user
		$scope.wpr.createUser = function() {
			if (checkConfirmPassword()) {
				$scope.btn.loading = true;

				Auth.register($scope.formData.user)
					.then(function(user) {
						// success callback
						// Add other user data to users branch
						$scope.formData.userData.email = $scope.formData.user.email;
						$scope.formData.userData.admin = false;

						User.create(user.uid, $scope.formData.userData)
							.then(function() {
								console.log('Other user data saved successfully');
							}, function() {
								console.log('Something went wrong while trying to save other user data');
							});

						// Log the user in
						Auth.login($scope.formData.user)
							.then(function() {
								console.log('User logged in successfully. User Uid: ' + user.uid + ' User Email: ' + user.email);
							}, function() {
								console.log('Something went wrong while trying to login');
							});

						$scope.btn.success = true;
						$scope.btn.loading = false;
						btnReset(1000);

						$scope.wpr.progressWidth = 1;

						$scope.msg.success = 'Awesome - registration was successful! :)';

						// Relocate to previous page after short delay
						$timeout(function() {
							$window.history.go(-1);
						}, 2000);
						
					}, function(error) {
						// error callback
						$scope.btn.success = false;
						$scope.btn.loading = false;
						btnReset(1000);

						console.log(error);

						switch (error.code) {
							case 'EMAIL_TAKEN':
								console.log(error.message);
								$scope.msg.error = 'The specified email address already exists.';
								break;
							default:
								console.log(error.message);
								$scope.msg.error = 'Something went wrong - please try again.';
								break;
						}

						// Send back to first step after short delay
						$timeout(function() {
							$scope.wpr.showStep(1);
							$scope.msg.error = '';
						}, 2000);
					});
			} else if (!checkConfirmPassword()) {
				$scope.msg.error = 'Password and confirm password does not match. Please check again.';

				// Erase the error message after short delay
				$timeout(function() {
					$scope.msg.error = '';
				}, 5000);
			}
		};

  });
