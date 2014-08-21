'use strict';

angular.module('coderfrontApp')
  .controller('BackendCtrl', function ($scope, $firebase, FIREBASE_URL, $firebaseSimpleLogin, $location, Unit, Lesson) {
		
		// Wrapper object
		$scope.backend = {};

		$scope.menuToggle = false;

		// Close sidebar on 'adminSidebar:close' event (for add-unit and add-lesson)
		$scope.$on('adminSidebar:close', function() {
			$scope.menuToggle = false;
		});

		// Modal control for deleting units or lessons
		$scope.$on('openModal:deleteUnit', function(event, data) {
			$scope.backend.courseId = data.courseId;
			$scope.backend.unitData = data.unitData;
			$scope.backend.deleteUnitModalOpen = true;
			console.log('modal event received for unit');

			// Get the units for this course
			var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.backend.courseId + '/units');
			var unitsArray = $firebase(unitsRef).$asArray();

			unitsArray.$loaded()
				.then(function() {
					$scope.backend.unitsArray = unitsArray;
				});

		});

		$scope.$on('openModal:deleteLesson', function(event, data) {
			$scope.backend.courseId = data.courseId;
			$scope.backend.unitId = data.unitId;
			$scope.backend.lessonData = data.lessonData;
			$scope.backend.deleteLessonModalOpen = true;
			console.log('modal event received for lesson');

			console.log($scope.backend.courseId);
			console.log($scope.backend.unitId);

			// Get the lessons for this course
	    var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.backend.courseId + '/units/' + $scope.backend.unitId + '/lessons');
	    var lessonsArray = $firebase(lessonsRef).$asArray();

	    lessonsArray.$loaded()
				.then(function() {
					console.log(lessonsArray);
					$scope.backend.lessonsArray = lessonsArray;
				});

		});

		// Remove unit
		$scope.backend.removeUnit = function(unitId, unit) {
			Unit.remove(unitId, unit, $scope.backend.unitsArray)
				.then(function() {
					// Success callback
					console.log('Successfully removed unit');
				}, function() {
					// Error callback
					console.log('Error removing unit');
				});
		};

		// Remove lesson
		$scope.backend.removeLesson = function(lessonId, lesson) {
			Lesson.remove(lessonId, lesson, $scope.backend.lessonsArray)
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
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
				if (user === null) {
					$location.path('/');
				}
			});

  });
