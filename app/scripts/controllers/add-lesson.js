'use strict';

angular.module('coderfrontApp')
  .controller('AddLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson, $location, $timeout) {

		// Wrapper objects
		$scope.wpr = {};
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
			}, delay);
		};

		// Find the right course
		$scope.wpr.courseId = $stateParams.courseId;
		$scope.wpr.course = Course.find($stateParams.courseId);

		// Find the right unit
		$scope.wpr.unitId = $stateParams.unitId;
    
		$scope.wpr.unitsArray = Unit.array($scope.wpr.courseId);
		$scope.wpr.unit = Unit.find($scope.wpr.courseId, $stateParams.unitId);

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once it loads
		$scope.wpr.pageLoading = true;

    Lesson.arrayLoaded($scope.wpr.courseId, $scope.wpr.unitId)
			.then(function(lessonsArray) {
				$scope.wpr.pageLoading = false;

				// Stores all units in an array
				$scope.wpr.lessonsArray = lessonsArray;
			});

		// Modal related variable
		$scope.wpr.overwriteModalOpen = false;

		// Add a new lesson
		$scope.wpr.createLesson = function() {
			$scope.btn.loading = true;

			Lesson.create($scope.wpr.courseId, $scope.wpr.unitId, $scope.formData.lesson)
				.then(function(ref) {
					// Success callback
					
					// Get this lesson's UID
					$scope.wpr.lessonId = ref.name();

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();

					// Relocate to view-lesson after 1s
					$timeout(function() {
						$location.path('/backend/' + $scope.wpr.courseId + '/view-lesson/' + $scope.wpr.unitId + '/' + $scope.wpr.lessonId);
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
		$scope.wpr.overwriteLesson = function() {
			Lesson.overwrite($scope.wpr.courseId, $scope.wpr.unitId, $scope.formData.lesson, $scope.wpr.lessonIdToBeRemoved)
				.then(function(ref) {
					// Success callback

					// Get this lesson's UID
					$scope.wpr.lessonId = ref.name();

					// Form reset
					formReset();

					// Relocate to view-lesson
					$location.path('/backend/' + $scope.wpr.courseId + '/view-lesson/' + $scope.wpr.unitId + '/' + $scope.wpr.lessonId);
				}, function() {
					// Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Insert a new lesson and push down lessons below
		$scope.wpr.insertLesson = function() {
			Lesson.insert($scope.wpr.courseId, $scope.wpr.unitId, $scope.formData.lesson)
				.then(function(ref) {
					// Success callback

					// Get this lesson's UID
					$scope.wpr.lessonId = ref.name();

					// Form reset
					formReset();

					// Relocate to view-lesson
					$location.path('/backend/' + $scope.wpr.courseId + '/view-lesson/' + $scope.wpr.unitId + '/' + $scope.wpr.lessonId);
				}, function() {
					//Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Check existing lessons for duplicates
		$scope.wpr.checkDuplicateLesson = function() {
			// if lesson already exists
			Lesson.alreadyExists($scope.wpr.courseId, $scope.wpr.unitId, $scope.formData.lesson)
				.then(function(lessonIdToBeRemoved) {
					// open overwrite modal
					$scope.wpr.overwriteModalOpen = true;

					$scope.wpr.lessonIdToBeRemoved = lessonIdToBeRemoved;
				}, function() {
					$scope.wpr.createLesson();
				});
		};

  });
