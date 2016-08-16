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

Router.route('/templates', function () {
  this.render('templates')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Templates', null)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        templates: Templates.find({}, {sort: {createdAt: -1}})
      }
    }
  },
  name: 'templates.index',
  title: 'Templates'
})

Router.route('/templates/add', function () {
  this.render('templatesAdd')
}, {
  name: 'templates.add',
  title: 'Add',
  parent: 'templates.index'
})

Router.route('/templates/:_id/edit', function () {
  this.render('templatesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Templates', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        template: Templates.findOne({_id: this.params._id})
      }
    }
  },
  name: 'templates.edit',
  title: function() {
    return (!!this.data() && !!this.data().template) ? this.data().template.name : ''
  },
  parent: 'templates.index'
})

Router.route('/collections', function () {
  this.render('collections')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Collections', null)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        collections: Collections.find({}, {sort: {createdAt: -1}})
      }
    }
  },
  name: 'collections.index',
  title: 'Collections'
})

Router.route('/collections/add', function () {
  this.render('collectionsAdd')
}, {
  name: 'collections.add',
  title: 'Add',
  parent: 'collections.index'
})

Router.route('/collections/:_id/edit', function () {
  this.render('collectionsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Collections', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        template: Collections.findOne({_id: this.params._id})
      }
    }
  },
  name: 'collections.edit',
  title: function() {
    return (!!this.data() && !!this.data().collection) ? this.data().collection.name : ''
  },
  parent: 'collections.index'
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
      Meteor.subscribe('Collections', null),
      Meteor.subscribe('Templates', null)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        collections: Collections.find(),
        templates: Templates.find()
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
