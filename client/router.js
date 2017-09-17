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
    this.redirect('/jobs')
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
  subscriptions: function() {
    return [
      Meteor.subscribe('JobsNames', null)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        jobs: Jobs.find({})
      }
    }
  },
  name: 'demo.index',
  title: 'Demo'
})

Router.route('/functions', function () {
  this.render('functions')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Functions', null)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        functions: Functions.find({}, {sort: {createdAt: -1}})
      }
    }
  },
  name: 'functions.index',
  title: 'Functions'
})

Router.route('/functions/add', function () {
  this.render('functionsAdd')
}, {
  name: 'functions.add',
  title: 'Add',
  parent: 'functions.index'
})

Router.route('/functions/:_id/edit', function () {
  this.render('functionsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Functions', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        function: Functions.findOne({_id: this.params._id})
      }
    }
  },
  name: 'functions.edit',
  title: function() {
    return (!!this.data() && !!this.data().function) ? this.data().function.name : ''
  },
  parent: 'functions.index'
})

Router.route('/datas', function () {
  this.render('datas')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Datas', null)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        datas: Datas.find({}, {sort: {createdAt: -1}})
      }
    }
  },
  name: 'datas.index',
  title: 'Datas'
})

Router.route('/datas/add', function () {
  this.render('datasAdd')
}, {
  name: 'datas.add',
  title: 'Add',
  parent: 'datas.index'
})

Router.route('/datas/:_id/edit', function () {
  this.render('datasEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Datas', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        data: Datas.findOne({_id: this.params._id})
      }
    }
  },
  name: 'datas.edit',
  title: function() {
    return (!!this.data() && !!this.data().data) ? this.data().data.name : ''
  },
  parent: 'datas.index'
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
  title: 'Jobs'
})

Router.route('/jobs/add', function () {
  this.render('jobsAdd')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Datas', null),
      Meteor.subscribe('Functions', null)
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
      Meteor.subscribe('jobsResultDistinct', this.params._id, null),
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
  parent: 'jobs.view'
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

Router.route('/jobs/:jobId/results/:_id', function () {
  this.render('jobsResultsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Jobs', this.params.jobId),
      Meteor.subscribe('JobsResult', this.params.jobId, this.params._id)
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
