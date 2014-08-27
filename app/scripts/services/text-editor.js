'use strict';

angular.module('coderfrontApp')
  .factory('TextEditor', function () {

    var TextEditor = {
      addParagraphTags: function(text) {
        var textPattern = /(.*)\n+/g;
        text = text + '\n';
        var textParagraphs = text.match(textPattern);
        text = '<p>' + textParagraphs.join('</p><p>') + '</p>';
        
        return text;
      },
      splitName: function(fullname) {
        var pattern = /(\w+)\s/g;
        var name = fullname + ' ';
        var nameArray = name.match(pattern);

        for (var i=0; i<nameArray.length; i++) {
          nameArray[i] = nameArray[i].slice(0, nameArray[i].length-1);
        }

        return nameArray;
      }
    };

    return TextEditor;

  });
