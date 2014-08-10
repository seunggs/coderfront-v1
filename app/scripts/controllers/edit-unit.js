'use strict';

angular.module('coderfrontApp')
  .controller('EditUnitCtrl', function ($scope, $stateParams, Unit, $location, $timeout, FIREBASE_URL, $firebase) {

		// Wrapper objects
		$scope.editUnit = {};
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

		// Find the right course and unit
		$scope.editUnit.courseId = $stateParams.courseId;
		$scope.editUnit.unitId = $stateParams.unitId;

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once Firebase loads
		$scope.editUnit.pageLoading = true;

    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.editUnit.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				$scope.editUnit.pageLoading = false;

				// Stores all units in an array
				$scope.editUnit.unitsArray = unitsArray;
				// Get this specific unit
				$scope.editUnit.unit = Unit.find($scope.editUnit.unitId, $scope.editUnit.unitsArray);

				// Initialize formData with this unit obj
				$scope.formData.unit = $scope.editUnit.unit;
			});

		// Update unit
		$scope.editUnit.updateUnit = function() {
			$scope.btn.loading = true; // button control

			Unit.update($scope.editUnit.unit.$id, $scope.formData.unit, $scope.editUnit.unitsArray)
				.then(function() {
					// Success callback

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Relocate to view-unit after 1.5s
					$timeout(function() {
						$location.path('/admin/' + $scope.editUnit.courseId + '/view-unit/' + $scope.editUnit.unitId);
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

  });
