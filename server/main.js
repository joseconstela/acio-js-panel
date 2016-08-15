Meteor.startup(() => {

  Meteor.methods({
    updateJobStatus: (jobId, status) => {
      
      Jobs.update({
        _id: jobId
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

      CappedJobs.insert({
        jobId: jobId,
        action: status
      })
    }
  })

})
