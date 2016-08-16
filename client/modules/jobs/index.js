Template.jobsTableItem.events({
  "click .job-status-switch": (event, template) => {
    let newStatus = $(event.target).data('job-status')
    Meteor.call('updateJobStatus', template.data._id, newStatus)
  }
})

Template.jobsViewCollection.events({
  "click .see-entire-collection": (event, template) => {
  }
})
