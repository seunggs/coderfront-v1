'use strict';

angular.module('coderfrontApp')
  .controller('AddUnitCtrl', function ($scope, Unit) {

		// Controls "Loading..." button
		$scope.btn = {
			loading: false
		};

		// Wrapper object for this controller for dot notation
		$scope.addUnit = {};

		$scope.addUnit.courseId = $scope.$parent.admin.courseId;

		// function for checking existing units for duplicate upon createUnit
		var units = Unit.all($scope.addUnit.courseId);
		$scope.addUnit.checkDuplicateUnit = function(unitId) {
			if (units[unitId] !== undefined) {
				return true;
			} else {
				return false;
			}
		};

		// Add a new unit
		$scope.addUnit.createUnit = function() {
			$scope.btn.loading = true;
			// Check existing units for duplicate
			if ($scope.addUnit.checkDuplicateUnit === true) {
				// DO SOMETHING
			}

			Unit.create($scope.addUnit.courseId, $scope.addUnit.unitId, $scope.addUnit.unit)
				.then(function() {
					// Success callback
					$scope.btn.loading = false;
					
					Unit.incrementCounter();

					// Relocate to unit-edit.html
					$scope.$parent.edit.dashboard = false;
					$scope.$parent.edit.unit = true;
				}, function() {
					// Error callback
					$scope.btn.loading = false;
					console.log('Error');
				});

		};


  });
