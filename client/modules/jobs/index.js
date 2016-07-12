Template.jobsTableItem.events({
  "click .job-status-switch": (event, template) => {
    let newStatus = $(event.target).data('job-status')
    Meteor.call('updateJobStatus', template.data._id, newStatus);
  }
})

Template.jobsAdd.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('textarea')[0], {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
  });
}

Template.jobsEdit.rendered = function() {
  if ($('textarea').length)
  var editor = CodeMirror.fromTextArea($('textarea')[0], {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
  });
}
