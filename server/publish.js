Meteor.publish('Jobs', (jobId) =>
jobId ? Jobs.find({jobId: jobId}) : Jobs.find()
)

Meteor.publish('JobsResults', (jobId, limit) =>
JobsResults.find({jobId:jobId}, {limit: limit, sort: {createdAt:-1}})
)

Meteor.publish('JobsResult', (jobId, resultId) =>
JobsResults.find({jobId:jobId, resultId: resultId})
)

Meteor.publish('jobsResultDistinct', function(jobId) {

  let results = JobsResults.aggregate(
    [
      {
        $match: {
          'jobId': jobId,
          'data': {$exists: true}
        }
      },
      {
        $group: {
          _id: { hashedResult: "$hashedResult", resultId: "$resultId", data: "$data" },
          count: { "$sum": 1 }
        }
      }
    ]
  )

  var r = this;
  _.each(results, function(result) {
    r.added('JobsResults', Random.id(), {_r:result});
  });

  r.ready();

})
