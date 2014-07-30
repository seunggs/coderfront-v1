'use strict';

angular.module('coderfrontApp')
  .controller('ViewLessonCtrl', function ($scope, $stateParams, Course, Unit, Lesson) {
		// Wrapper objects
		$scope.viewLesson = {};
		$scope.formData = {};
		$scope.formData.lesson = {};

		// Find the right unit & course
		$scope.viewLesson.courseId = $stateParams.courseId;
		$scope.viewLesson.unitId = $stateParams.unitId;
		$scope.viewLesson.unit = Unit.find($stateParams.unitId, $scope.viewLesson.courseId);

		// Find the right lesson
		$scope.viewLesson.lessons = Lesson.all($scope.viewLesson.unitId);
		$scope.viewLesson.lessonId = $stateParams.lessonId;
		$scope.viewLesson.lesson = Lesson.find($scope.viewLesson.unitId, $scope.viewLesson.lessonId);

  });
