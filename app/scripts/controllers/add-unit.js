'use strict';

angular.module('coderfrontApp')
  .controller('AddUnitCtrl', function ($scope, $stateParams, Course, Unit, $location, $timeout) {

		// Wrapper objects
		$scope.addUnit = {};
		$scope.formData = {};
		$scope.formData.unit = {};
		var formReset = function() {
			$scope.formData = {};
			$scope.formData.unit = {};
		};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
				console.log('button variable reset ok');
			}, delay);
		};

		// Find the right course
		$scope.addUnit.courseId = $stateParams.courseId;
		$scope.addUnit.course = Course.find($stateParams.courseId);

		// Get all units
		$scope.addUnit.units = Unit.all($scope.addUnit.courseId);

		// Modal related variable
		$scope.addUnit.overwriteModalOpen = false;

		// Add a new unit
		$scope.addUnit.createUnit = function() {
			$scope.btn.loading = true;

			Unit.create($scope.addUnit.courseId, $scope.formData.unit)
				.then(function(ref) {
					// Success callback
					
					// Get this unit's UID
					$scope.addUnit.unitId = ref.name();

					// Add to counter
					Unit.incrementCounter($scope.addUnit.courseId);

					// Set priority
					Unit.updatePriority($scope.addUnit.courseId);

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();

					// Relocate to edit-unit after 1s
					$timeout(function() {
						$location.path('/admin/' + $scope.addUnit.courseId + '/view-unit/' + $scope.addUnit.unitId);
					}, 1000);

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

		// Add a new unit and overwrite the old
		$scope.addUnit.overwriteUnit = function() {
			Unit.overwrite($scope.addUnit.courseId, $scope.formData.unit, $scope.addUnit.unitIdToRemove)
				.then(function(ref) {
					// Success callback

					// Get this unit's UID
					$scope.addUnit.unitId = ref.name();

					// Set priority
					Unit.updatePriority($scope.addUnit.courseId);

					// Form reset
					formReset();

					// Relocate to unit-edit
					$location.path('/admin/' + $scope.addUnit.courseId + '/view-unit/' + $scope.addUnit.unitId);
				}, function() {
					// Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Insert a new unit and push down units below
		$scope.addUnit.insertUnit = function() {
			Unit.insert($scope.addUnit.courseId, $scope.formData.unit)
				.then(function(ref) {
					// Success callback

					// Get this unit's UID
					$scope.addUnit.unitId = ref.name();

					// Add to counter
					Unit.incrementCounter($scope.addUnit.courseId);

					// Set & update priority
					Unit.updatePriority($scope.addUnit.courseId);

					// Form reset
					formReset();

					// Relocate to unit-edit
					$location.path('/admin/' + $scope.addUnit.courseId + '/view-unit/' + $scope.addUnit.unitId);
				}, function() {
					//Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Check existing units for duplicates
		$scope.addUnit.checkDuplicateUnit = function() {
			// if unit already exists
			var unitExists = Unit.alreadyExists($scope.addUnit.courseId, $scope.formData.unit);

			if (unitExists === false) {
				$scope.addUnit.createUnit();
			} else {
				// open overwrite modal
				$scope.addUnit.overwriteModalOpen = true;

				$scope.addUnit.unitIdToRemove = unitExists;
			}
		};

  });
