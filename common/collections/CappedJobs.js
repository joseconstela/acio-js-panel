CappedJobs = new Meteor.Collection('CappedJobs');

CappedJobs.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});
