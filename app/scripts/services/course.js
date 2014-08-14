'use strict';

angular.module('coderfrontApp')
  .factory('Course', function ($firebase, FIREBASE_URL) {

    var coursesRef = new Firebase(FIREBASE_URL + 'courses');
    var courses = $firebase(coursesRef);
    var coursesObj = courses.$asObject();

    var Course = {
      all: coursesObj,
      create: function(course) {
        return courses.$push(course);
      },
      find: function(courseId) {
        return coursesObj[courseId];
      },
      remove: function(courseId) {
        return courses.$remove(courseId);
      }
    };

    return Course;

  });
