Meteor.publish('Jobs', (jobId) =>
  jobId ? Jobs.find({jobId: jobId}) : Jobs.find()
)

Meteor.publish('JobsResults', (jobId, limit) =>
  JobsResults.find({jobId:jobId}, {limit: limit, sort: {createdAt:-1}})
)

Meteor.publish('JobsResult', (jobId, resultId) =>
  JobsResults.find({jobId:jobId, resultId: resultId})
)
