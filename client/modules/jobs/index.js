Template.jobsTableItem.events({
  "click .job-status-switch": (event, template) => {
    let newStatus = $(event.target).data('job-status')
    Meteor.call('updateJobStatus', template.data._id, newStatus);
  }
})

var codeMirrorOpts = {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  tabSize: 2,
  gutters: [80],
  extraKeys: {"Ctrl-Q": "toggleComment"}
};

Template.jobsAdd.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts);
}

Template.jobsEdit.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('.codemirror')[0], codeMirrorOpts);
}
