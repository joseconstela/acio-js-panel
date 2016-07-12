document.documentElement.lang = 'en'

Router.configure({
  layoutTemplate: 'appLayout'
})

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    this.redirect('/')
  }
  this.next()
}, {
  except: [
    'site.index'
  ]
})

Router.route('/', function () {
  if (Meteor.userId()) {
    this.render('home')
  } else {
    this.layout('siteLayout')
  }
}, {
  name: 'index',
  title: 'Home'
})

Router.route('/demo', function () {
  this.render('demo')
}, {
  name: 'demo.index',
  title: 'Demo',
  parent: 'index'
})

Router.route('/jobs', function () {
  this.render('jobs')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', null)
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
  title: 'Jobs',
  parent: 'index'
})

Router.route('/jobs/add', function () {
  this.render('jobsAdd')
}, {
  name: 'jobs.add',
  title: 'Add',
  parent: 'jobs.index'
})

Router.route('/jobs/:_id/edit', function () {
  this.render('jobsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        job: Jobs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'jobs.edit',
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
      Meteor.subscribe('jobsResultDistinct', this.params._id, 5),
      Meteor.subscribe('Jobs', this.params._id)
    ]
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
  parent: 'jobs.edit'
})

Router.route('/jobs/:_id/results/top', function () {
  this.render('jobsAllTopResults')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('jobsResultDistinct', this.params._id),
      Meteor.subscribe('Jobs', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        results: JobsResults.find({}, {sort: {'_r.count':-1}}),
        job: Jobs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'jobs.results.top',
  title: 'All top results',
  parent: 'jobs.results.index'
})

Router.route('/jobs/:_id/results/all', function () {
  this.render('jobsResultsAll')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', this.params._id),
      Meteor.subscribe('JobsResults', this.params._id)
    ]
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

Router.route('/jobs/:_id/results/:resultId', function () {
  this.render('jobsResultsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', this.params.resultId),
      Meteor.subscribe('JobsResult', this.params._id, this.params.resultId)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        result: JobsResults.findOne({resultId: this.params.resultId, jobId: this.params._id}),
        job: Jobs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'jobs.result',
  title: 'Result',
  parent: 'jobs.results.index'
})

Jobs.before.insert( (userId, doc) => {

  if (!doc.history) {
    doc.history = [{
      at: new Date(),
      status: 'created'
    }]
  }

}, {fetchPrevious: false})


Jobs.before.update( (userId, doc, fieldNames, modifier, options) => {

  delete modifier['$set'].history

  modifier['$push'] = {}

  modifier['$push'].history = {
    at: new Date(),
    status: 'updated',
    userId: Meteor.userId()
  }

})
