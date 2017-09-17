
Router.route('/jobs', function () {
  this.render('jobs')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', {}, {})
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        jobs: Jobs.find({}, {sort: {createdAt: -1}})
      }
    }
  },
  name: 'jobs.index',
  title: 'Jobs'
})

Router.route('/jobs/add', function () {
  this.render('jobsAdd')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Datas', {}, {}),
      Meteor.subscribe('Functions', {}, {})
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        datas: Datas.find(),
        functions: Functions.find()
      }
    }
  },
  name: 'jobs.add',
  title: 'Add',
  parent: 'jobs.index'
})

Router.route('/jobs/:_id', function () {
  this.render('jobsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', {
        _id: this.params._id
      }, {})
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        job: Jobs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'jobs.view',
  title: function() {
    return (!!this.data() && !!this.data().job) ? this.data().job.name : ''
  },
  parent: 'jobs.index'
})

Router.route('/jobs/:_id/results', function () {
  this.render('jobsTop5Results')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('jobsResultDistinct', {
        jobId: this.params._id
      }, {}),
      Meteor.subscribe('Jobs', {
        _id: this.params._id
      })
    ];
  },
  data: function() {
    if (this.ready) {
      return {
        results: JobsResults.find({}, {sort: {'_r.count':-1}}),
        job: Jobs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'jobs.results.index',
  title: 'Results',
  parent: 'jobs.view'
})

Router.route('/jobs/:_id/results/all', function () {
  this.render('jobsResultsAll');
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', {
        _id: this.params._id
      }, {}),
      Meteor.subscribe('JobsResults', {
        jobId: this.params._id
      }, {sort: {createdAt: -1}})
    ];
  },
  data: function() {
    if (this.ready) {
      return {
        results: JobsResults.find(),
        job: Jobs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'jobs.results.all',
  title: 'All',
  parent: 'jobs.results.index'
})

Router.route('/jobs/:jobId/results/:_id', function () {
  this.render('jobsResultsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', {
        _id: this.params.jobId
      }),
      Meteor.subscribe('JobsResultJobsResult', {
        jobId: this.params.jobId,
        _id: this.params._id
      }, {})
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        result: JobsResults.findOne({_id: this.params._id, jobId: this.params.jobId}),
        job: Jobs.findOne({_id: this.params.jobId})
      }
    }
  },
  name: 'jobs.result',
  title: 'Result',
  parent: 'jobs.results.index'
})
