'use strict';

angular.module('coderfrontApp')
  .controller('AddUnitCtrl', function ($scope, $stateParams, Course, Unit, $location, $timeout) {

		// Wrapper objects
		$scope.wpr = {};
		$scope.formData = {};
		$scope.formData.unit = {};
		var formReset = function() {
			$scope.formData = {};
			$scope.formData.unit = {};
		};

		// Find the right course
		$scope.wpr.courseId = $stateParams.courseId;
		$scope.wpr.course = Course.find($stateParams.courseId);

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once it loads
		$scope.wpr.pageLoading = true;

		Unit.arrayLoaded($scope.wpr.courseId)
			.then(function(unitsArray) {
				$scope.wpr.pageLoading = false;

				// Stores all units in an array
				$scope.wpr.unitsArray = unitsArray;
			});

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Modal control
		$scope.wpr.overwriteModalOpen = false;

		// Add a new unit
		$scope.wpr.createUnit = function() {
			$scope.btn.loading = true;

			Unit.create($scope.wpr.courseId, $scope.formData.unit)
				.then(function(ref) {
					// Success callback
					
					// Get this unit's UID
					$scope.wpr.unitId = ref.name();

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();

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

					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Add a new unit and overwrite the old
		$scope.wpr.overwriteUnit = function() {
			Unit.overwrite($scope.wpr.courseId, $scope.formData.unit, $scope.wpr.unitIdToRemove)
				.then(function(ref) {
					// Success callback

					// Get this unit's UID
					$scope.wpr.unitId = ref.name();

					// Form reset
					formReset();

					// Relocate to unit-edit
					$location.path('/backend/' + $scope.wpr.courseId + '/view-unit/' + $scope.wpr.unitId);
				}, function() {
					// Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Insert a new unit and push down units below
		$scope.wpr.insertUnit = function() {
			Unit.insert($scope.wpr.courseId, $scope.formData.unit)
				.then(function(ref) {
					// Success callback

					// Get this unit's UID
					$scope.wpr.unitId = ref.name();

					// Form reset
					formReset();

					// Relocate to unit-edit
					$location.path('/backend/' + $scope.wpr.courseId + '/view-unit/' + $scope.wpr.unitId);
				}, function() {
					//Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Check existing units for duplicates
		$scope.wpr.checkDuplicateUnit = function() {
			// if unit already exists
			Unit.alreadyExists($scope.wpr.courseId, $scope.formData.unit)
				.then(function(unitId) {
					// open overwrite modal
					$scope.wpr.overwriteModalOpen = true;

					$scope.wpr.unitIdToRemove = unitId;
				}, function() {
					$scope.wpr.createUnit();
				});
		};

  });
