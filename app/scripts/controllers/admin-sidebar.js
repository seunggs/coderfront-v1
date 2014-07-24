'use strict';

angular.module('coderfrontApp')
  .controller('AdminSidebarCtrl', function ($scope, Course, Unit) {
		// Wrapper object for this controller for dot notation
		$scope.adminSidebar = {};

		// Find the right course
		$scope.adminSidebar.courseId = $scope.$parent.addUnit.courseId;
		$scope.adminSidebar.course = Course.find($scope.adminSidebar.courseId);

		// Stores all units
		$scope.adminSidebar.units = Unit.all($scope.adminSidebar.courseId);

		// Remove unit
		$scope.adminSidebar.removeUnit = function(unitId) {
			Unit.remove($scope.adminSidebar.courseId, unitId)
				.then(function() {
					Unit.decrementCounter();
				}, function() {
					// Error callback
					console.log('Error removing unit');
				});
		};
  });
