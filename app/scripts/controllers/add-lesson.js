'use strict';

angular.module('coderfrontApp')
  .controller('AddLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson, $location, $timeout, FIREBASE_URL, $firebase) {

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
			}, delay);
		};

		// Find the right course
		$scope.addLesson.courseId = $stateParams.courseId;
		$scope.addLesson.course = Course.find($stateParams.courseId);

		// Find the right unit
    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.addLesson.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

		$scope.addLesson.unitId = $stateParams.unitId;
    
    unitsArray.$loaded()
			.then(function() {
				// Stores all units in an array
				$scope.addLesson.unitsArray = unitsArray;
				$scope.addLesson.unit = Unit.find($stateParams.unitId, $scope.addLesson.unitsArray);
			});

		// Show page loading while Firebase loads
		// And initiate Firebase related variables once it loads
		$scope.addLesson.pageLoading = true;

    var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.addLesson.courseId + '/units/' + $scope.addLesson.unitId + '/lessons');
    var lessonsArray = $firebase(lessonsRef).$asArray();

    lessonsArray.$loaded()
			.then(function() {
				$scope.addLesson.pageLoading = false;

				// Stores all units in an array
				$scope.addLesson.lessonsArray = lessonsArray;
			});

		// Modal related variable
		$scope.addLesson.overwriteModalOpen = false;

		// Add a new lesson
		$scope.addLesson.createLesson = function() {
			$scope.btn.loading = true;

			Lesson.create($scope.formData.lesson, $scope.addLesson.lessonsArray)
				.then(function(ref) {
					// Success callback
					
					// Get this lesson's UID
					$scope.addLesson.lessonId = ref.name();

					// Button control
					$scope.btn.loading = false;
					$scope.btn.success = true;
					btnReset(1000);

					// Form reset
					formReset();

					// Relocate to view-lesson after 1s
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
			Lesson.overwrite($scope.formData.lesson, $scope.addLesson.lessonsArray, $scope.addLesson.lessonIdToBeRemoved)
				.then(function(ref) {
					// Success callback

					// Get this lesson's UID
					$scope.addLesson.lessonId = ref.name();

					// Form reset
					formReset();

					// Relocate to view-lesson
					$location.path('/admin/' + $scope.addLesson.courseId + '/view-lesson/' + $scope.addLesson.unitId + '/' + $scope.addLesson.lessonId);
				}, function() {
					// Error callback
					// Form reset
					formReset();

					console.log('Error');
				});
		};

		// Insert a new lesson and push down lessons below
		$scope.addLesson.insertLesson = function() {
			Lesson.insert($scope.formData.lesson, $scope.addLesson.lessonsArray)
				.then(function(ref) {
					// Success callback

					// Get this lesson's UID
					$scope.addLesson.lessonId = ref.name();

					// Form reset
					formReset();

					// Relocate to view-lesson
					$location.path('/admin/' + $scope.addLesson.courseId + '/view-lesson/' + $scope.addLesson.unitId + '/' + $scope.addLesson.lessonId);
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
			var lessonExists = Lesson.alreadyExists($scope.formData.lesson, $scope.addLesson.lessonsArray);
			
			if (lessonExists === false) {
				$scope.addLesson.createLesson();
			} else {
				// open overwrite modal
				$scope.addLesson.overwriteModalOpen = true;

				$scope.addLesson.lessonIdToBeRemoved = lessonExists;
			}
		};

  });
