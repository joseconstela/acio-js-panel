Meteor.publish('Jobs', (jobId) =>
  jobId ? Jobs.find({_id: jobId}) : Jobs.find()
)

Meteor.publish('JobsResults', (jobId, limit) =>
JobsResults.find({jobId:jobId}, {limit: limit, sort: {createdAt:-1}})
)

Meteor.publish('JobsResult', (jobId, resultId) =>
JobsResults.find({jobId:jobId, resultId: resultId})
)

Meteor.publish('jobsResultDistinct', function(jobId, limit) {

  let aggregation = [
    {
      $match: {
        'jobId': jobId,
        'data': {$exists: true}
      }
    },
    {
      $group: {
        _id: { hashedResult: "$hashedResult", data: "$data" },
        count: { "$sum": 1 }
      }
    }
  ]

  if (!!limit) {
    aggregation.push({
      $limit: limit
    })
  }

  let results = JobsResults.aggregate(aggregation)

  var r = this;
  _.each(results, function(result) {
    r.added('JobsResults', Random.id(), {_r:result});
  });

  r.ready();

})
