CappedJobs = new Meteor.Collection('CappedJobs');

CappedJobs.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return false; },
  remove: function () { return false; }
});
