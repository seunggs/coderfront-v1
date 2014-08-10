'use strict';

angular.module('coderfrontApp')
  .factory('Lesson', function () {

    var Lesson = {
      alreadyExists: function(lesson, lessonsArray) {
        // If lessonsArray length is zero, we know this is the first lesson to be added
        if (lessonsArray.length === 0) {
          return false;
        }

        // Check existing lessons for duplicate
        for (var i=0; i<lessonsArray.length; i++) {
          if (lesson.lessonNum === lessonsArray[i].lessonNum) {
            return lessonsArray[i].$id;
          }
        }

        return false;
      },
      create: function(lesson, lessonsArray) {
        return lessonsArray.$add(lesson);
      },
      overwrite: function(lesson, lessonsArray, lessonIdToRemove) {
        var index = lessonsArray.$indexFor(lessonIdToRemove);
        lessonsArray.$remove(index);

        // Then add new lesson
        return lessonsArray.$add(lesson);
      },
      insert: function(lesson, lessonsArray) {
        // This method push all the lessons below the lessonId and insert this lesson
        // Update the lessonNum of all lessons below
        for(var i=lesson.lessonNum-1; i<lessonsArray.length; i++) {
          lessonsArray[i].lessonNum = parseInt(i) + 2;
          lessonsArray.$save(i);
        }
        // Insert the new lesson
        return lessonsArray.$add(lesson);
      },
      update: function(oldLessonId, newLesson, lessonsArray) {
        var index = lessonsArray.$indexFor(oldLessonId);
        lessonsArray[index] = newLesson;
        return lessonsArray.$save(index);
      },
      find: function(lessonId, lessonsArray) {
        var index = lessonsArray.$indexFor(lessonId);
        return lessonsArray[index];
      },
      remove: function(lessonId, lesson, lessonsArray) {
        // Reduce the lessonNum's of the lessons below it by 1
        for(var i=lesson.lessonNum; i<lessonsArray.length; i++) {
          lessonsArray[i].lessonNum = parseInt(i);
          lessonsArray.$save(i);
        }
        // Remove this lesson
        var lessonIndex = lessonsArray.$indexFor(lessonId);

        return lessonsArray.$remove(lessonIndex);
      }
    };

    return Lesson;

  });
