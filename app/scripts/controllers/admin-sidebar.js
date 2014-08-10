'use strict';

angular.module('coderfrontApp')
  .controller('AdminSidebarCtrl', function ($scope, $stateParams, Course, Unit, Lesson, $firebase, FIREBASE_URL) {

		// Wrapper object for this controller for dot notation
		$scope.adminSidebar = {};

		// Find the right course
		$scope.adminSidebar.courseId = $stateParams.courseId;
		$scope.adminSidebar.course = Course.find($stateParams.courseId);

		// Initiate Firebase related variables once Firebase loads
    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.adminSidebar.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				$scope.adminSidebar.unitsArray = unitsArray;
			});

		// Remove unit
		$scope.adminSidebar.removeUnit = function(unitId, unit) {
			Unit.remove(unitId, unit, $scope.adminSidebar.unitsArray)
				.then(function() {
					// Success callback
					console.log('Successfully removed unit');
				}, function() {
					// Error callback
					console.log('Error removing unit');
				});
		};

		// Remove lesson
		$scope.adminSidebar.removeLesson = function(unitId, lessonId, lesson) {
	    var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.adminSidebar.courseId + '/units/' + unitId + '/lessons');
	    var lessonsArray = $firebase(lessonsRef).$asArray();

	    lessonsArray.$loaded()
				.then(function() {
					// Stores all lessons in an array
					console.log(lessonId, lesson);
					console.log(lessonsArray);
					Lesson.remove(lessonId, lesson, lessonsArray)
						.then(function() {
							// Success callback
							console.log('Successfully removed lesson');
						}, function() {
							// Error callback
							console.log('Error removing lesson');
						});
				});
		};
  });
