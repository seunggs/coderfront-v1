'use strict';

angular.module('coderfrontApp')
  .controller('EditUnitCtrl', function ($scope, $stateParams, Unit, $location, $timeout, User) {

		// Wrapper objects
		$scope.wpr = {};
		$scope.formData = {};
		$scope.formData.unit = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
				console.log('button variable reset ok');
			}, delay);
		};

		// Get the ids
		$scope.wpr.courseId = $stateParams.courseId;
		$scope.wpr.unitId = $stateParams.unitId;

		// Show page loading while Firebase loads
		$scope.wpr.pageLoading = true;

		// Get this unit
		Unit.find($scope.wpr.courseId, $scope.wpr.unitId)
			.then(function(unitObj) {
				// Once units array loads, turn off page loading
				$scope.wpr.pageLoading = false;

				// Get this specific unit
				$scope.wpr.unit = unitObj;

				// Initialize formData with this unit obj
				$scope.formData.unit = $scope.wpr.unit;
			});

		// Update unit
		$scope.wpr.updateUnit = function() {
			$scope.btn.loading = true; // button control

			Unit.update($scope.wpr.courseId, $scope.wpr.unitId, $scope.formData.unit)
				.then(function() {
					// Success callback

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Relocate to view-unit after 1.5s
					$timeout(function() {
						$location.path('/backend/' + $scope.wpr.courseId + '/view-unit/' + $scope.wpr.unitId);
					}, 1500);

				}, function() {
					// Error callback
					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					console.log('Error');
				});
		};

		// See if this user is an admin and kick them out to home if not
		User.thisUser()
			.then(function(userDataObj) {
				$scope.wpr.userDataObj = userDataObj;
				if ($scope.wpr.userDataObj.admin === false) {
					// If the user is not admin, kick them out to home
					$location.path('/');
				}
			});

  });
