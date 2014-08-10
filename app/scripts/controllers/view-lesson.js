'use strict';

angular.module('coderfrontApp')
  .controller('ViewLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson, FIREBASE_URL, $firebase) {
		// Wrapper objects
		$scope.viewLesson = {};
		$scope.formData = {};
		$scope.formData.lesson = {};

		// Find the right unit & course
		$scope.viewLesson.courseId = $stateParams.courseId;
		$scope.viewLesson.unitId = $stateParams.unitId;

    var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.viewLesson.courseId + '/units');
    var unitsArray = $firebase(unitsRef).$asArray();

    unitsArray.$loaded()
			.then(function() {
				// Stores all units in an array
				$scope.viewLesson.unitsArray = unitsArray;
				// Get this specific unit
				$scope.viewLesson.unit = Unit.find($scope.viewLesson.unitId, $scope.viewLesson.unitsArray);
			});

		// Find the right lesson
		$scope.viewLesson.lessonId = $stateParams.lessonId;

    var lessonsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.viewLesson.courseId + '/units/' + $scope.viewLesson.unitId + '/lessons');
    var lessonsArray = $firebase(lessonsRef).$asArray();

    lessonsArray.$loaded()
			.then(function() {
				// Stores all lessons in an array
				$scope.viewLesson.lessonsArray = lessonsArray;
				// Get this specific lesson
				$scope.viewLesson.lesson = Lesson.find($stateParams.lessonId, $scope.viewLesson.lessonsArray);
			});
    

  });
