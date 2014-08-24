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
      }
    };

    return TextEditor;

  });
