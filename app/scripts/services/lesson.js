'use strict';

angular.module('coderfrontApp')
  .factory('Lesson', function ($firebase, FIREBASE_URL, Counter) {

    var Lesson = {
      // Counter exists to keep track of total lessons
      // Currently, there's no Firebase method that allows this
      count: function(unitId) {
        var lessonCounter = Counter.lessonCounter(unitId);

        if(lessonCounter === undefined) {
          return null;
        } else {
          return lessonCounter;
        }
      },
      incrementCounter: function(unitId) {
        var lessonCounter = Counter.lessonCounter(unitId);
        var lessonCounters = Counter.lessonCounters(unitId);

        if(lessonCounter === undefined) {
          return lessonCounters.$update({lessonCounter: 1});
        } else {
          return lessonCounters.$update({lessonCounter: lessonCounter + 1});
        }
      },
      decrementCounter: function(unitId) {
        var lessonCounter = Counter.lessonCounter(unitId);
        var lessonCounters = Counter.lessonCounters(unitId);

        if(lessonCounter <= 1) {
          return lessonCounters.$remove('lessonCounter');
        } else {
          return lessonCounters.$update({lessonCounter: lessonCounter - 1});
        }
      },
      updatePriority: function(unitId) {
        var lessonCounter = Counter.lessonCounter(unitId);

        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        // Go through entire record and set priority to match lesson.lessonNum
        if (lessonCounter !== undefined) {
          for (var i=1; i<lessonCounter+1; i++) {
            var lessonId = (lessons.$getIndex()[parseInt(i)-1]).toString();
            
            var newPriority = lessons.$child(lessonId).lessonNum;

            // Set priority of the lessons to their respective lessonNums
            lessonsRef.child(lessonId).setPriority(newPriority);
          }
        } else {
          console.log('There are no lessons');
        }
      },
      alreadyExists: function(unitId, lesson) {
        var lessonCounter = Counter.lessonCounter(unitId);

        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        // If counters.lessonCounter doesn't exist, we know this is the first lesson to be added
        if (lessonCounter === undefined) {
          return false;
        }

        // Check existing lessons for duplicate
        for (var i=1; i<lessonCounter+1; i++) {
          var duplicateLessonId = (lessons.$getIndex()[parseInt(i)-1]).toString();

          if (lesson.lessonNum === lessons.$child(duplicateLessonId).lessonNum) {
            return duplicateLessonId;
          }
        }

        return false;
      },
      all: function(unitId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        return lessons;
      },
      create: function(unitId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        return lessons.$add(lesson);
      },
      overwrite: function(unitId, lesson, unitIdToRemove) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        // First remove the lesson to be overwrited
        lessons.$remove(unitIdToRemove);

        // Then add new lesson
        return lessons.$add(lesson);
      },
      insert: function(unitId, lesson) {
        var lessonCounter = Counter.lessonCounter(unitId);

        // This method push all the lessons below the lessonId and insert this lesson
        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        // Update the lessonNum of all lessons below
        for(var i=lesson.lessonNum; i<lessonCounter+1; i++) {
          var lessonIdBelow = (lessons.$getIndex()[parseInt(i)-1]).toString();
          lessons.$child(lessonIdBelow).$update({lessonNum: parseInt(i)+1});
        }
        // Insert the new lesson
        return lessons.$add(lesson);
      },
      update: function(unitId, lessonId, lesson) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        return lessons.$child(lessonId).$update(lesson);
      },
      duplicate: function(unitId, lesson) {
        // Duplicates the lesson and adds the duplicated lesson right below
        var lessonCounter = Counter.lessonCounter(unitId);

        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        var duplicateLessonNum = parseInt(lesson.lessonNum) + 1; // lessonNum of the duplicated lesson

        // Update the lessonNum of all lessons below the duplicated lesson
        for(var i=duplicateLessonNum; i<lessonCounter+1; i++) {
          var lessonIdBelow = (lessons.$getIndex()[parseInt(i)-1]).toString();
          lessons.$child(lessonIdBelow).$update({lessonNum: parseInt(i)+1});
        }
        // Change the lessonNum for the duplicate lesson
        lesson.lessonNum = duplicateLessonNum;

        // Insert the new lesson and change the lessonNum
        return lessons.$add(lesson);
      },
      find: function(unitId, lessonId) {
        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        return lessons.$child(lessonId);
      },
      remove: function(unitId, lessonId, lesson) {
        var lessonCounter = Counter.lessonCounter(unitId);
        console.log(lessonCounter);

        var lessonsRef = new Firebase(FIREBASE_URL + 'units/' + unitId + '/lessons');
        var lessons = $firebase(lessonsRef);

        // Reduce the lessonNum's of the lessons below it by 1
        for(var i=lesson.lessonNum+1; i<lessonCounter+1; i++) {
          var lessonIdBelow = (lessons.$getIndex()[parseInt(i)-1]).toString();
          console.log(lessonIdBelow);
          lessons.$child(lessonIdBelow).$update({lessonNum: parseInt(i)-1});
        }
        // Remove the lesson in question
        console.log(lessonId);
        return lessons.$remove(lessonId);
      }
    };

    return Lesson;

  });
