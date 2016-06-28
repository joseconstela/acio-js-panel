Meteor.startup(() => {

  Meteor.methods({
    updateJobStatus: (jobId, status) => {
      Jobs.update({
        jobId: jobId
      }, {
        $set: {
          status: status
        },
        $push: {
          history: {
            at: new Date(),
            userId: Meteor.userId(),
            status: status
          }
        }
      })
    }
  })

})
