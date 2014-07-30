'use strict';

angular.module('coderfrontApp')
  .controller('ViewUnitCtrl', function ($scope, $stateParams, Course, Unit) {
		// Wrapper objects
		$scope.viewUnit = {};
		$scope.formData = {};
		$scope.formData.unit = {};

		// Find the right course
		$scope.viewUnit.courseId = $stateParams.courseId;
		$scope.viewUnit.course = Course.find($stateParams.courseId);

		// Find the right unit
		$scope.viewUnit.units = Unit.all($scope.viewUnit.courseId);
		$scope.viewUnit.unitId = $stateParams.unitId;
		$scope.viewUnit.unit = Unit.find($scope.viewUnit.courseId, $scope.viewUnit.unitId);

  });
