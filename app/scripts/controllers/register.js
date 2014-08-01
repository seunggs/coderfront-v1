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
			}, delay);
		};

		// Initialize focus
		$scope.register.focus = {
			step1: true
		};

    // Step control
    $scope.register.totalSteps = 2;
    $scope.register.step = 1;

    $scope.register.showStep = function(step) {
			$scope.register.step = step;
	
	    // Set top progressbar width
			$scope.register.progressWidth = ($scope.register.step-1) / $scope.register.totalSteps;

			// Set focus 
			$scope.register.focus.step1 = false;
			$scope.register.focus.step2 = true;
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
