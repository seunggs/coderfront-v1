'use strict';

angular.module('coderfrontApp')
  .controller('EditLessonCtrl', function ($scope, $stateParams, Unit, Lesson, $location, $timeout) {

		// Wrapper objects
		$scope.editLesson = {};
		$scope.formData = {};
		$scope.formData.lesson = {};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
				console.log('button variable reset ok');
			}, delay);
		};

		// Find the right unit and lesson
		$scope.editLesson.unitId = $stateParams.unitId;
		$scope.editLesson.unit = Unit.find($stateParams.courseId, $stateParams.unitId);

		$scope.editLesson.lessonId = $stateParams.lessonId;
		$scope.editLesson.lesson = Lesson.find($stateParams.unitId, $stateParams.lessonId);

		// Initialize formData with this lesson obj
		var formReset = function() {
			$scope.formData = {};
			$scope.formData.lesson = $scope.editLesson.lesson;
		};
		formReset();

		// Update lesson
		$scope.editLesson.updateLesson = function() {
			$scope.btn.loading = true; // button control

			Lesson.update($scope.editLesson.unitId, $scope.editLesson.lesson.$id, $scope.formData.lesson)
				.then(function() {
					// Success callback

					// Set priority
					Lesson.updatePriority($scope.editLesson.unitId);

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();
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

  });
