'use strict';

angular.module('coderfrontApp')
  .controller('LoginCtrl', function ($scope, $timeout, $location, Auth) {
		// Wrapper object
		$scope.login = {};
		$scope.formData = {};
		$scope.msg = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		$scope.login.signIn = function() {
			$scope.btn.loading = true;

			Auth.login($scope.formData.existingUser)
				.then(function() {
					// success callback
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					$scope.msg.success = 'Success! You are now signed in - happy learning! :)';

					// Relocate to home after short delay
					$timeout(function() {
						$location.path('/');
					}, 2000);

				}, function() {
					// error callback
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					$scope.msg.error = 'User email or password incorrect. Please try again.';

					// Erase the message after short delay
					$timeout(function() {
						$scope.msg.error = '';
					}, 5000);
				});
		};

  });
