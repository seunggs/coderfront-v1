'use strict';

angular.module('coderfrontApp')
  .controller('RegisterCtrl', function ($scope, $timeout) {

		// Wrapper object
		$scope.register = {};
		$scope.formData = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
				console.log('button variable reset ok');
			}, delay);
		};

    // Show steps
    $scope.register.step = 1;

    $scope.register.showStep = function(step) {
			$scope.register.step = step;
    };

		// Check if password = confirmPassword
		$scope.register.checkConfirmPassword = function() {
			$scope.btn.loading = true;

			if ($scope.formData.password === $scope.formData.confirmPassword) {
				$scope.btn.success = true;
				$scope.btn.loading = false;
				btnReset(1000);
			} else {
				$scope.btn.success = false;
				$scope.btn.loading = false;
				btnReset(1000);
			}
		};


  });
