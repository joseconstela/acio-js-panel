Template.templatesAdd.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts);
}

Template.templatesEdit.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts);
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
