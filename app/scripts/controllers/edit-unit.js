'use strict';

angular.module('coderfrontApp')
  .controller('EditUnitCtrl', function ($scope, $stateParams, Unit, $location, $timeout) {

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
		$scope.editUnit.unit = Unit.find($stateParams.courseId, $stateParams.unitId);

		// Initialize formData with this unit obj
		var formReset = function() {
			$scope.formData = {};
			$scope.formData.unit = $scope.editUnit.unit;
		};
		formReset();

		// Update unit
		$scope.editUnit.updateUnit = function() {
			$scope.btn.loading = true; // button control

			Unit.update($scope.editUnit.courseId, $scope.editUnit.unit.$id, $scope.formData.unit)
				.then(function() {
					// Success callback

					// Set priority
					Unit.updatePriority($scope.editUnit.courseId);

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();
				}, function() {
					// Error callback
					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					// Form reset
					formReset();

					console.log('Error');
				});
		};

  });
