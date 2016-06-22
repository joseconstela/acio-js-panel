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

Router.route('/help', function () {
  this.render('help')
}, {
  name: 'help.index',
  title: 'Help',
  parent: 'index'
})

Router.route('/jobs', function () {
  this.render('jobs')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        jobs: Jobs.find()
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

Router.route('/jobs/:jobId/edit', function () {
  this.render('jobsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        job: Jobs.findOne({jobId: this.params.jobId})
      }
    }
  },
  name: 'jobs.edit',
  title: function() {
    return (!!this.data() && !!this.data().job) ? this.data().job.name : ''
  },
  parent: 'jobs.index'
})

Router.route('/jobs/:jobId/results', function () {
  this.render('jobsResults')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('JobsResults', this.params.jobId, 10),
      Meteor.subscribe('Jobs')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        results: JobsResults.find(),
        job: Jobs.findOne({jobId: this.params.jobId})
      }
    }
  },
  name: 'jobs.results',
  title: 'Results',
  parent: 'jobs.edit'
})

Router.route('/jobs/:jobId/results/all', function () {
  this.render('jobsResultsAll')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs'),
      Meteor.subscribe('JobsResults', this.params.jobId)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        results: JobsResults.find(),
        job: Jobs.findOne({jobId: this.params.jobId})
      }
    }
  },
  name: 'jobs.results.all',
  title: 'All',
  parent: 'jobs.results'
})

Router.route('/jobs/:jobId/results/:resultId', function () {
  this.render('jobsResultsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('JobsResult', this.params.jobId, this.params.resultId)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        result: JobsResults.findOne({resultId: this.params.resultId, jobId: this.params.jobId})
      }
    }
  },
  name: 'jobs.result',
  title: 'Result',
  parent: 'jobs.results'
})
