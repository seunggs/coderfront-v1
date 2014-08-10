'use strict';

angular.module('coderfrontApp')
  .controller('ResetpasswordCtrl', function ($scope, $timeout, Auth, $location) {
		// Wrapper object
		$scope.resetpassword = {};
		$scope.formData = {};
		$scope.msg = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

    // Send password reset email
    $scope.resetpassword.sendPasswordResetEmail = function() {
			$scope.btn.loading = true;

			Auth.sendPasswordResetEmail($scope.formData.user.email)
				.then(function() {
					// success callback
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					$scope.msg.error = 'Great - now, go check your inbox!';

					// Relocate to home after short delay
					$timeout(function() {
						$location.path('home');
					}, 1500);
				}, function() {
					// error callback
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					$scope.msg.error = 'There was a problem sending you the email. Please try again later.';

					// Relocate to home after short delay
					$timeout(function() {
						$location.path('home');
					}, 1500);
				});
    };

  });
