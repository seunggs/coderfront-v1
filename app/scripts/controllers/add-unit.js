'use strict';

angular.module('coderfrontApp')
  .controller('AddUnitCtrl', function ($scope, $routeParams, Course, Unit, $location) {

		// Controls "Loading..." button
		$scope.btn = {
			loading: false
		};

		// Wrapper object for this controller for dot notation
		$scope.addUnit = {};

		// Find the right course
		$scope.addUnit.courseId = $routeParams.courseId;
		$scope.addUnit.course = Course.find($routeParams.courseId);

		// Initialize variables
		$scope.addUnit.overwriteModalOpen = false;

		// Increment/decrement unit counter function
		$scope.incrementUnitCounter = function() {
			Unit.incrementCounter();
		};

		$scope.decrementUnitCounter = function() {
			Unit.decrementCounter();
		};

		// Add a new unit
		$scope.addUnit.createUnit = function() {
			$scope.btn.loading = true;

			Unit.create($scope.addUnit.courseId, $scope.addUnit.unitId, $scope.addUnit.unit)
				.then(function() {
					// Success callback
					$scope.btn.loading = false;
					
					$scope.incrementUnitCounter();

					// Relocate to edit-unit
					$location.path('/edit-unit/' + $scope.addUnit.unitId);
				}, function() {
					// Error callback
					$scope.btn.loading = false;
					console.log('Error');
				});
		};

		// Add a new unit
		$scope.addUnit.overwriteUnit = function() {
			Unit.create($scope.addUnit.courseId, $scope.addUnit.unitId, $scope.addUnit.unit)
				.then(function() {
					// Success callback
					// Relocate to unit-edit
					$location.path('/edit-unit/' + $scope.addUnit.unitId);
				}, function() {
					// Error callback
					console.log('Error');
				});
		};

		// Insert a new unit and push down units below
		$scope.addUnit.insertUnit = function() {
			Unit.insert($scope.addUnit.courseId, $scope.addUnit.unitId, $scope.addUnit.unit)
				.then(function() {
					// Success callback
					console.log('insert successful');
					$scope.incrementUnitCounter();

					// Relocate to unit-edit.html
					$scope.$parent.edit.dashboard = false;
					$scope.$parent.edit.unit = true;
				}, function() {
					//Error callback
					console.log('Error');
				});
		};

		// Check existing units for duplicate upon createUnit
		var units = Unit.all($scope.addUnit.courseId);
		$scope.addUnit.checkDuplicateUnit = function(unitId) {
			if( units[unitId] !== undefined) {
				// open overwrite modal
				$scope.addUnit.overwriteModalOpen = true;
				console.log($scope.addUnit.overwriteModalOpen);
			} else {
				$scope.addUnit.createUnit();
			}
		};

  });
