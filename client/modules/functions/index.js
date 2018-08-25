Template.functionsAdd.rendered = function() {
  if ($('textarea').length) {
    setTimeout(function() {
      CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts).refresh();
    }, 400)
  }
}

Template.functionsEdit.rendered = function() {
  if ($('textarea').length) {
    setTimeout(function() {
      CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts).refresh();
    }, 400)
  }
}

Template.functionsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this function?")) {
       Functions.remove({
         _id: template.data._id
       })
    }
  }
});

Template.templatesAdd.rendered = function() {
  setTimeout(function() {
    CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts).refresh();
  }, 400)
}

Template.templatesEdit.rendered = function() {
  setTimeout(function() {
    CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts).refresh();
  }, 400)
}

Template.templatesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this template?")) {
       Templates.remove({
         _id: template.data._id
       })
    }
  }
});
