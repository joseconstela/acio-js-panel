Template.functionsAdd.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts);
}

Template.functionsEdit.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts);
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
