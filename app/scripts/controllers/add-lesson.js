'use strict';

angular.module('coderfrontApp')
  .controller('AddLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson, $location, $timeout) {

		// Wrapper objects
		$scope.addLesson = {};
		$scope.formData = {};
		$scope.formData.lesson = {};
		var formReset = function() {
			$scope.formData = {};
			$scope.formData.lesson = {};
		};

		// Button object wrappers & functions
		$scope.btn = {};
		var btnReset = function(delay) {
			$timeout(function() {
				$scope.btn = {};
				console.log('button variable reset ok');
			}, delay);
		};

		// Find the right course and unit
		$scope.addLesson.courseId = $stateParams.courseId;
		$scope.addLesson.course = Course.find($stateParams.courseId);

		$scope.addLesson.unitId = $stateParams.unitId;
		$scope.addLesson.unit = Unit.find($stateParams.courseId, $stateParams.unitId);

		// Get all lessons
		$scope.addLesson.lessons = Lesson.all($scope.addLesson.unitId);

		// Modal related variable
		$scope.addLesson.overwriteModalOpen = false;

		// Add a new lesson
		$scope.addLesson.createLesson = function() {
			$scope.btn.loading = true;

			Lesson.create($scope.addLesson.unitId, $scope.formData.lesson)
				.then(function(ref) {
					// Success callback
					
					// Get this lesson's UID
					$scope.addLesson.lessonId = ref.name();

					// Add to counter
					Lesson.incrementCounter($scope.addLesson.unitId);

					// Set priority
					Lesson.updatePriority($scope.addLesson.unitId);

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();

					// Relocate to edit-lesson after 1s
					$timeout(function() {
						$location.path('/admin/' + $scope.addLesson.courseId + '/view-lesson/' + $scope.addLesson.unitId + '/' + $scope.addLesson.lessonId);
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

		// Add a new lesson and overwrite the old
		$scope.addLesson.overwriteLesson = function() {
			Lesson.overwrite($scope.addLesson.unitId, $scope.formData.lesson, $scope.addLesson.lessonIdToBeRemoved)
				.then(function(ref) {
					// Success callback

					// Get this lesson's UID
					$scope.addLesson.lessonId = ref.name();

					// Set priority
					Lesson.updatePriority($scope.addLesson.unitId);

					// Form reset
					formReset();

					// Relocate to lesson-edit
					$location.path('/admin/' + $scope.addLesson.unitId + '/edit-lesson/' + $scope.addLesson.lessonId + '/' + $scope.addLesson.lessonId);
				}, function() {
					// Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Insert a new lesson and push down lessons below
		$scope.addLesson.insertLesson = function() {
			Lesson.insert($scope.addLesson.unitId, $scope.formData.lesson)
				.then(function(ref) {
					// Success callback

					// Get this lesson's UID
					$scope.addLesson.lessonId = ref.name();

					// Add to counter
					Lesson.incrementCounter($scope.addLesson.unitId);

					// Set & update priority
					Lesson.updatePriority($scope.addLesson.unitId);

					// Form reset
					formReset();

					// Relocate to lesson-edit
					$location.path('/admin/' + $scope.addLesson.unitId + '/edit-lesson/' + $scope.addLesson.lessonId + '/' + $scope.addLesson.lessonId);
				}, function() {
					//Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Check existing lessons for duplicates
		$scope.addLesson.checkDuplicateLesson = function() {
			// if lesson already exists
			var lessonExists = Lesson.alreadyExists($scope.addLesson.unitId, $scope.formData.lesson);
			if (lessonExists === false) {
				$scope.addLesson.createLesson();
			} else {
				// open overwrite modal
				$scope.addLesson.overwriteModalOpen = true;

				$scope.addLesson.lessonIdToBeRemoved = lessonExists;
			}
		};

  });
