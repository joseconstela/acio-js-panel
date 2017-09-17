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
