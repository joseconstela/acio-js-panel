Meteor.publish('Jobs', (query, options) => Jobs.find(query, options));

Meteor.publish('Functions', (query, options) => Functions.find(query, options));

Meteor.publish('Templates', (query, options) => Templates.find(query, options));

Meteor.publish('Datas', (query, options) => Datas.find(query, options));

Meteor.publish('JobsNames', (query, options) => Jobs.find(query, options));

Meteor.publish('JobsResults', (query, options) => JobsResults.find(query, options));

Meteor.publish('JobsResult', (query, options) => JobsResults.find(query, options));

Meteor.publish('jobsResultDistinct', function(query, options) {

  // TODO validate query.jobId = string

  query.data = {$exists: true}

  let aggregation = [
    {
      $match: query
    },
    {
      $group: {
        _id: { hashedResult: "$hashedResult", data: "$data" },
        count: { "$sum": 1 }
      }
    }
  ]

  if (!!options.limit) {
    aggregation.push({
      $limit: options.limit
    })
  }

  const results = JobsResults.aggregate(aggregation);

  var r = this;
  _.each(results, function(result) {
    r.added('JobsResults', Random.id(), {_r:result});
  });

  r.ready();

})
