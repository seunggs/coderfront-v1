'use strict';

angular.module('coderfrontApp')
  .controller('ChangepasswordCtrl', function ($scope, $timeout, $location, Auth) {
		// Wrapper object
		$scope.changepassword = {};
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
		$scope.changepassword.focus = {
			step1: true
		};

    // Step control
    $scope.changepassword.totalSteps = 2;
    $scope.changepassword.step = 1;

    $scope.changepassword.showStep = function(step) {
			$scope.changepassword.step = step;
	
	    // Set top progressbar width
			$scope.changepassword.progressWidth = ($scope.changepassword.step-1) / $scope.changepassword.totalSteps;

			// Set focus 
			$scope.changepassword.focus.step1 = false;
			$scope.changepassword.focus.step2 = true;
    };

		// Get parameter from URL
		if(($location.search()).forgotPassword) {
			$scope.fromForgotPassword = true;
		}

		// Check if password = confirmPassword
		var checkConfirmPassword = function() {
			return $scope.formData.user.newPassword === $scope.formData.confirmPassword ? true : false;
		};

		// Change password
		$scope.changepassword.changePassword = function() {
			if (checkConfirmPassword()) {
				$scope.btn.loading = true;

				Auth.changePassword($scope.formData.user)
					.then(function() {
						// success callback
						$scope.btn.loading = false;
						$scope.btn.success = true;
						btnReset(1000);

						$scope.changepassword.progressWidth = 1;

						$scope.msg.success= 'Success! Your password was successfully updated.';

						// Relocate to home after short delay
						$timeout(function() {
							$location.path('/home');
						}, 1500);

					}, function(error) {
						// error callback
						$scope.btn.loading = false;
						$scope.btn.success = false;
						btnReset(1000);

						switch (error.code) {
							case 'INVALID_PASSWORD':
								console.log(error.message);
								$scope.msg.error = 'The specified password is incorrect.';
								break;
							default:
								console.log(error.message);
								$scope.msg.error = 'Something went wrong - please try again.';
								break;
						}

						// Send back to first step after short delay
						$timeout(function() {
							$scope.changepassword.showStep(1);
							$scope.msg.error = '';
						}, 1500);

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
