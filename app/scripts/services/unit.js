'use strict';

angular.module('coderfrontApp')
  .factory('Unit', function (FIREBASE_URL, $firebase, $q) {

    var Unit = {
      alreadyExists: function(courseId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function() {
            // If unitsArray length is zero, we know this is the first unit to be added
            if (unitsArray.length === 0) {
              deferred.reject(false);
            }

            // Check existing units for duplicate
            for (var i=0; i<unitsArray.length; i++) {
              if (unit.unitNum === unitsArray[i].unitNum) {
                deferred.resolve(unitsArray[i].$id);
              }
            }

            deferred.reject(false);
          });

        return deferred.promise;
      },
      arrayLoaded: function(courseId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(deferred.resolve, deferred.reject);

        return deferred.promise;
      },
      create: function(courseId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function() {
            unitsArray.$add(unit)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      overwrite: function(courseId, unit, unitIdToRemove) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function() {
            var index = unitsArray.$indexFor(unitIdToRemove);
            unitsArray.$remove(index);

            // Then add new unit
            unitsArray.$add(unit)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      insert: function(courseId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function(){
            // This method push all the units below the unitId and insert this unit
            // Update the unitNum of all units below
            for(var i=unit.unitNum-1; i<unitsArray.length; i++) {
              unitsArray[i].unitNum = parseInt(i) + 2;
              unitsArray.$save(i);
            }
            // Insert the new unit
            unitsArray.$add(unit)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      update: function(courseId, oldUnitId, newUnit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function(){
            var index = unitsArray.$indexFor(oldUnitId);
            unitsArray[index] = newUnit;
            
            unitsArray.$save(index)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      },
      array: function(courseId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function() {
            deferred.resolve(unitsArray);
          });

        return deferred.promise;
      },
      find: function(courseId, unitId) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function() {
            var index = unitsArray.$indexFor(unitId);

            if (index === -1) {
              deferred.reject(-1);
            } else {
              deferred.resolve(unitsArray[index]);
            }
          });

        return deferred.promise;
      },
      remove: function(courseId, unitId, unit) {
        var unitsRef = new Firebase(FIREBASE_URL + 'courses/' + courseId + '/units');
        var units = $firebase(unitsRef);
        var unitsArray = units.$asArray();

        var deferred = $q.defer();

        unitsArray.$loaded()
          .then(function() {
            // Reduce the unitNum's of the units below it by 1
            for(var i=unit.unitNum; i<unitsArray.length; i++) {
              unitsArray[i].unitNum = parseInt(i);
              unitsArray.$save(i);
            }
            // Remove this unit
            var unitIndex = unitsArray.$indexFor(unitId);
            unitsArray.$remove(unitIndex)
              .then(deferred.resolve, deferred.reject);
          });

        return deferred.promise;
      }
    };

    return Unit;

  });
