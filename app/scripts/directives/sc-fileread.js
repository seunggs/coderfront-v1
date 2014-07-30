/*jshint loopfunc: true */
'use strict';

angular.module('coderfrontApp')
  .directive('scFileread', function () {
    // Ex usage: <input type="file" name="file" sc-fileread="fileData">
    // Use sc-fileread to store the file data instead of using ng-model
    // Attr: 
    // 1) filereadType: text, data

    return {
      scope: {
        scFileread: '=',
        filereadType: '@'
      },
      link: function (scope, element) {
        scope.filereadType = scope.filereadType === undefined ? 'text' : scope.filereadType;
        element.on('change', function (changeEvent) {
          var files = changeEvent.target.files; // FileList object; multiple files allowed
          scope.scFileread = []; // Define the binding variable that will store images data

          for (var i=0; i<files.length; i++) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.scFileread.push(loadEvent.target.result);
              });
            };
            if (scope.filereadType === 'text') {
							reader.readAsText(files[i]);
            } else if (scope.filereadType === 'data') {
							reader.readAsDataURL(files[i]);
            }
          }
        });
      }
    };
  });
