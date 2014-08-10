'use strict';

angular.module('coderfrontApp')
  .factory('Unit', function () {

    var Unit = {
      alreadyExists: function(unit, unitsArray) {
        // If unitsArray length is zero, we know this is the first unit to be added
        if (unitsArray.length === 0) {
          return false;
        }

        // Check existing units for duplicate
        for (var i=0; i<unitsArray.length; i++) {
          if (unit.unitNum === unitsArray[i].unitNum) {
            return unitsArray[i].$id;
          }
        }

        return false;
      },
      create: function(unit, unitsArray) {
        return unitsArray.$add(unit);
      },
      overwrite: function(unit, unitsArray, unitIdToRemove) {
        var index = unitsArray.$indexFor(unitIdToRemove);
        unitsArray.$remove(index);

        // Then add new unit
        return unitsArray.$add(unit);
      },
      insert: function(unit, unitsArray) {
        // This method push all the units below the unitId and insert this unit
        // Update the unitNum of all units below
        for(var i=unit.unitNum-1; i<unitsArray.length; i++) {
          unitsArray[i].unitNum = parseInt(i) + 2;
          unitsArray.$save(i);
        }
        // Insert the new unit
        return unitsArray.$add(unit);
      },
      update: function(oldUnitId, newUnit, unitsArray) {
        var index = unitsArray.$indexFor(oldUnitId);
        unitsArray[index] = newUnit;
        return unitsArray.$save(index);
      },
      find: function(unitId, unitsArray) {
        var index = unitsArray.$indexFor(unitId);
        return unitsArray[index];
      },
      remove: function(unitId, unit, unitsArray) {
        // Reduce the unitNum's of the units below it by 1
        for(var i=unit.unitNum; i<unitsArray.length; i++) {
          unitsArray[i].unitNum = parseInt(i);
          unitsArray.$save(i);
        }
        // Remove this unit
        var unitIndex = unitsArray.$indexFor(unitId);
        return unitsArray.$remove(unitIndex);
      }
    };

    return Unit;

  });
