
Router.route('/templates', function () {
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

Router.route('/templates/add', function () {
  this.layout('fullWithAppLayout')
  this.render('templatesAdd')
}, {
  name: 'templates.add',
  title: 'Add',
  parent: 'templates.index'
})

Router.route('/templates/:_id/edit', function () {
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
