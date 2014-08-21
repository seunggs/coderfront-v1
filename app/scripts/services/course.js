'use strict';

angular.module('coderfrontApp')
  .factory('Course', function ($firebase, FIREBASE_URL, $q) {

    var coursesRef = new Firebase(FIREBASE_URL + 'courses');
    var courses = $firebase(coursesRef);
    var coursesObj = courses.$asObject();

    var Course = {
      getAll: function() {
        var deferred = $q.defer();

        coursesObj.$loaded()
          .then(function() {
            deferred.resolve(coursesObj);
          });

        return deferred.promise;
      },
      arrayLoaded: function() {
        var deferred = $q.defer();

        coursesObj.$loaded()
          .then(deferred.resolve, deferred.reject);

        return deferred.promise;
      },
      create: function(course) {
        var deferred = $q.defer();

        coursesObj.$loaded()
          .then(function() {
            courses.$push(course)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      find: function(courseId) {
        var deferred = $q.defer();

        coursesObj.$loaded()
          .then(function() {
            deferred.resolve(coursesObj[courseId]);
          });

        return deferred.promise;
      },
      remove: function(courseId) {
        var deferred = $q.defer();

        coursesObj.$loaded()
          .then(function() {
            courses.$remove(courseId)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      }
    };

    return Course;

  });
