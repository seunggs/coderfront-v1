/*jshint loopfunc: true */
'use strict';

angular.module('coderfrontApp')
  .controller('AdminSidebarCtrl', function ($scope, $stateParams, Course, Unit, Lesson, $firebase, FIREBASE_URL, $firebaseSimpleLogin, $rootScope) {

		// Wrapper object for this controller for dot notation
		$scope.adminSidebar = {};

		// Get this course
		$scope.adminSidebar.courseId = $stateParams.courseId;

		// Modal control
		$scope.adminSidebar.deleteUnitModalOpen = false;
		$scope.adminSidebar.deleteLessonModalOpen = false;

		$scope.adminSidebar.unitData = {}; // Temp object for modal unit data

		$scope.$watch('adminSidebar.deleteUnitModalOpen', function(newVal) {
			if (newVal) {
				$rootScope.$broadcast('openModal:deleteUnit', {
					courseId: $scope.adminSidebar.courseId,
					unitData: $scope.adminSidebar.unitData
				});

				// Reset
				$scope.adminSidebar.deleteUnitModalOpen = false;
			}
		});

		$scope.adminSidebar.unitId = ''; // Temp object for modal lesson data
		$scope.adminSidebar.lessonData = {}; // Temp object for modal lesson data

		$scope.$watch('adminSidebar.deleteLessonModalOpen', function(newVal) {
			if (newVal) {
				$rootScope.$broadcast('openModal:deleteLesson', {
					courseId: $scope.adminSidebar.courseId,
					unitId: $scope.adminSidebar.unitId,
					lessonData: $scope.adminSidebar.lessonData
				});

				// Reset
				$scope.adminSidebar.deleteUnitModalOpen = false;
			}
		});

		// Sidebar control
		$scope.adminSidebar.closeSidebar = false;
		$scope.$watch('adminSidebar.closeSidebar', function(newVal) {
			if (newVal) {
				$rootScope.$broadcast('adminSidebar:close');

				// Reset
				$scope.adminSidebar.closeSidebar = false;
			}
		});

		// Get all courses the user has purchased
		// First, get user uid
    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    loginObj.$getCurrentUser()
			.then(function(user) {
				if (user === null) {
					return;
				}
				
		    // Then get userData
				var userDataRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
				var userData = $firebase(userDataRef);
				var userDataObj = userData.$asObject();

				userDataObj.$loaded()
					.then(function() {
						// Now get the user
						$scope.adminSidebar.userData = userDataObj;
					});

				// Get all courses the user has purchased
				var purchasedCoursesRef = new Firebase(FIREBASE_URL + 'users/' + user.uid + '/courses');
				var purchasedCourses = $firebase(purchasedCoursesRef);
				var purchasedCoursesArray = purchasedCourses.$asArray();

				purchasedCoursesArray.$loaded()
					.then(function() {
						$scope.adminSidebar.userCoursesObj = {};
						
						for (var i=0; i<purchasedCoursesArray.length; i++) {
							var userCourseRef = new Firebase(FIREBASE_URL + 'courses/' + purchasedCoursesArray[i].$id);
							var userCourse = $firebase(userCourseRef);
							var userCourseObj = userCourse.$asObject();

							$scope.adminSidebar.userCoursesObj[userCourseObj.$id] = userCourseObj;
						}
					});
			});

		// Course toggle control
		$scope.adminSidebar.courseToggle = false;

		// Get the units for this course
		var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + $scope.adminSidebar.courseId + '/units');
		var unitsArray = $firebase(unitsRef).$asArray();

		unitsArray.$loaded()
			.then(function() {
				$scope.adminSidebar.unitsArray = unitsArray;
			});

  });
