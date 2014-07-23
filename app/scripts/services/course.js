'use strict';

angular.module('coderfrontApp')
  .factory('Course', function ($firebase, FIREBASE_URL) {

    var coursesRef = new Firebase(FIREBASE_URL + 'courses');
    var courses = $firebase(coursesRef);

    var countersRef = new Firebase(FIREBASE_URL + 'counters');
    var counters = $firebase(countersRef);

    var Course = {
      all: courses,
      create: function(course) {
        return courses.$add(course);
      },
      incrementCounter: function() {
        if(counters.courseCounter === undefined) {
          return counters.$set({courseCounter: 1});
        } else {
          return counters.$set({courseCounter: counters.courseCounter + 1});
        }
      },
      decrementCounter: function() {
        if(counters.courseCounter <= 1) {
          return counters.$remove('courseCounter');
        } else {
          return counters.$set({courseCounter: counters.courseCounter - 1});
        }
      },
      find: function(courseId) {
        return courses.$child(courseId);
      },
      remove: function(courseId) {
        return courses.$remove(courseId);
      }
    };

    return Course;

  });
