
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
