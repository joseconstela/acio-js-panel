
Router.route('/functions/templates', function () {
  this.render('templates')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Templates', {}, {})
    ];
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

Router.route('/functions/templates/add', function () {
  this.layout('fullWithAppLayout')
  this.render('templatesAdd')
}, {
  name: 'templates.add',
  title: 'Add',
  parent: 'templates.index'
})

Router.route('/functions/templates/:_id/edit', function () {
  this.layout('fullWithAppLayout')
  this.render('templatesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Templates', {
        _id: this.params._id
      }, {})
    ];
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


Router.route('/functions', function () {
  this.render('functions')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Functions', {}, {})
    ];
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
  this.layout('fullWithAppLayout')
  this.render('functionsAdd')
}, {
  name: 'functions.add',
  title: 'Add',
  parent: 'functions.index'
})

Router.route('/functions/:_id/edit', function () {
  this.layout('fullWithAppLayout')
  this.render('functionsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Functions', {
        _id: this.params._id
      }, {})
    ];
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

