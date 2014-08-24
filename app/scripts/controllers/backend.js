'use strict';

angular.module('coderfrontApp')
  .controller('BackendCtrl', function ($scope, $firebase, FIREBASE_URL, $firebaseSimpleLogin, Auth, $location, Unit, Lesson) {
		
		// Wrapper object
		$scope.wpr = {};

		$scope.menuToggle = false;

		// Close sidebar on 'adminSidebar:close' event (for add-unit and add-lesson)
		$scope.$on('adminSidebar:close', function() {
			$scope.menuToggle = false;
		});

		// Modal control for deleting units
		$scope.$on('openModal:deleteUnit', function(event, data) {
			$scope.wpr.courseId = data.courseId;
			$scope.wpr.unitData = data.unitData;
			$scope.wpr.deleteUnitModalOpen = true;
		});

		// Modal control for deleting lessons
		$scope.$on('openModal:deleteLesson', function(event, data) {
			$scope.wpr.courseId = data.courseId;
			$scope.wpr.unitId = data.unitId;
			$scope.wpr.lessonData = data.lessonData;
			$scope.wpr.deleteLessonModalOpen = true;
		});

		// Remove unit
		$scope.wpr.removeUnit = function() {
			Unit.remove($scope.wpr.courseId, $scope.wpr.unitData.$id, $scope.wpr.unitData)
				.then(function() {
					// Success callback
					console.log('Successfully removed unit');
				}, function() {
					// Error callback
					console.log('Error removing unit');
				});
		};

		// Remove lesson
		$scope.wpr.removeLesson = function() {
			Lesson.remove($scope.wpr.courseId, $scope.wpr.unitId, $scope.wpr.lessonData.$id, $scope.wpr.lessonData)
				.then(function() {
					// Success callback
					console.log('Successfully removed lesson');
				}, function() {
					// Error callback
					console.log('Error removing lesson');
				});
		};

		// Make sure the user is logged in
		// If not, send them back to home
		Auth.signedIn()
			.then(function(result) {
				if (result === false) {
					$location.path('/');
				}
			});

  });
