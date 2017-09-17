
Router.route('/datas', function () {
  this.render('datas')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Datas', {}, {})
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
  title: 'Data sets'
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
      Meteor.subscribe('Datas', {
        _id: this.params._id
      }, {})
    ];
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