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
  this.layout('socialLayout')
  this.render('home')
}, {
  name: 'index',
  title: 'Home'
})

Router.route('/demo', function () {
  this.render('demo')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('JobsNames', {}, {})
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

