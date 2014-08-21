'use strict';

angular.module('coderfrontApp')
  .controller('EditLessonCtrl', function ($scope, $stateParams, Unit, Lesson, $location, $timeout, FIREBASE_URL, $firebase) {

		// Wrapper objects
		$scope.editLesson = {};
		$scope.formData = {};
		$scope.formData.lesson = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
			}, delay);
		};

		// Find the right unit and lesson
		$scope.editLesson.courseId = $stateParams.courseId;
		$scope.editLesson.unitId = $stateParams.unitId;
		$scope.editLesson.lessonId = $stateParams.lessonId;

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once Firebase loads
		$scope.editLesson.pageLoading = true;

    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.editLesson.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				// Stores all units in an array
				$scope.editLesson.unitsArray = unitsArray;
				// Get this specific unit
				$scope.editLesson.unit = Unit.find($scope.editLesson.unitId, $scope.editLesson.unitsArray);

			});

    var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.editLesson.courseId + '/units/' + $scope.editLesson.unitId + '/lessons');
    var lessonsArray = $firebase(lessonsRef).$asArray();

    lessonsArray.$loaded()
			.then(function() {
				$scope.editLesson.pageLoading = false;

				// Stores all lessons in an array
				$scope.editLesson.lessonsArray = lessonsArray;

				// Find this specific lsson
				$scope.editLesson.lesson = Lesson.find($stateParams.lessonId, $scope.editLesson.lessonsArray);

				// Initialize formData with this lesson obj
				$scope.formData.lesson = $scope.editLesson.lesson;
				$scope.formData.lesson.bodyHTML = '';
			});

		// Update lesson
		$scope.editLesson.updateLesson = function() {
			$scope.btn.loading = true; // button control
			Lesson.update($scope.editLesson.lesson.$id, $scope.formData.lesson, $scope.editLesson.lessonsArray)
				.then(function() {
					// Success callback

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Relocate to view-lesson after 1.5s
					$timeout(function() {
						$location.path('/backend/' + $scope.editLesson.courseId + '/view-lesson/' + $scope.editLesson.unitId + '/' + $scope.editLesson.lessonId);
					}, 1500);

				}, function() {
					// Error callback
					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = false;
					btnReset(1000);

					console.log('Error');
				});
		};

  });
