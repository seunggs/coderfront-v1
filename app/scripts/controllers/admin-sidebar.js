'use strict';

angular.module('coderfrontApp')
  .controller('AdminSidebarCtrl', function ($scope, $stateParams, Course, Unit, Lesson, User, Purchase, $rootScope) {

		// Wrapper object for this controller for dot notation
		$scope.wpr = {};

		// Get this course
		$scope.wpr.courseId = $stateParams.courseId;

		// Modal control
		$scope.wpr.deleteUnitModalOpen = false;
		$scope.wpr.deleteLessonModalOpen = false;

		$scope.wpr.unitData = {}; // Temp object for modal unit data

		$scope.$watch('wpr.deleteUnitModalOpen', function(newVal) {
			if (newVal) {
				$rootScope.$broadcast('openModal:deleteUnit', {
					courseId: $scope.wpr.courseId,
					unitData: $scope.wpr.unitData
				});

				// Reset
				$scope.wpr.deleteUnitModalOpen = false;
			}
		});

		$scope.wpr.unitId = ''; // Temp object for modal lesson data
		$scope.wpr.lessonData = {}; // Temp object for modal lesson data

		$scope.$watch('wpr.deleteLessonModalOpen', function(newVal) {
			if (newVal) {
				$rootScope.$broadcast('openModal:deleteLesson', {
					courseId: $scope.wpr.courseId,
					unitId: $scope.wpr.unitId,
					lessonData: $scope.wpr.lessonData
				});

				// Reset
				$scope.wpr.deleteUnitModalOpen = false;
			}
		});

		// Sidebar control
		$scope.wpr.closeSidebar = false;
		$scope.$watch('wpr.closeSidebar', function(newVal) {
			if (newVal) {
				$rootScope.$broadcast('wpr:close');

				// Reset
				$scope.wpr.closeSidebar = false;
			}
		});

		// Get the user data obj
		User.thisUser()
			.then(function(thisUser) {
				$scope.wpr.userData = thisUser;
			});

		// Get all courses the user has purchased
		Purchase.courses()
			.then(function(purchasedCourses) {
				console.log(purchasedCourses);
				$scope.wpr.purchasedCoursesObj = purchasedCourses;
			});

		// Course toggle control
		$scope.wpr.courseToggle = false;

		// Get the units for this course
		Unit.array($scope.wpr.courseId)
			.then(function(unitsArray) {
				$scope.wpr.unitsArray = unitsArray;
			});

  });
