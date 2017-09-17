Jobs = new Mongo.Collection('Jobs')

Jobs.allow({
  insert: () => { return !!Meteor.user() },
  update: () => { return !!Meteor.user() },
  remove: () => { return false }
});

Jobs.attachSchema(new SimpleSchema({

  name: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea'
    }
  },
  status: {
    type: String,
    optional: false,
    allowedValues: ['stopped', 'working', 'finished', 'error'],
    autoValue: function () {
      if (!this.isSet) {
        return 'stopped'
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  history: {
    type: Array,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  'history.$': {
    type: Object
  },
  'history.$.status': {
    type: String,
    optional: false,
    allowedValues: ['created', 'stopped', 'working', 'finished']
  },
  'history.$.at': {
    type: Date,
    optional: false
  },
  'history.$.userId': {
    type: String,
    optional: false,
    autoValue: function() {
      if (!this.isSet) {
        return Meteor.userId()
      }
    }
  },
  env: {
    label: "Environment variables",
    type: Array,
    optional: true,
    autoform: {
      help: "accesible via process.env.KEY",
      template: 'keyvalueArray'
    }
  },
  'env.$': {
    type: Object,
    optional: true,
    autoform: {
      template: 'keyvalueArray'
    }
  },
  'env.$.key': {
    type: String,
    optional: true,
    autoform: {
      placeholder: 'KEY'
    }
  },
  'env.$.value': {
    type: String,
    optional: true,
    autoform: {
      placeholder: 'value'
    }
  },
  function: {
    type: Object,
    optional: true,
    autoform: {
      blackbox: true
    }
  },
  'function._id': {
    label: "Name",
    type: String,
    optional: false,
    autoform: {
      options: () => {
        return Functions.find().map( (c) => {
          return {label: c.name, value: c._id}
        })
      }
    }
  },
  data: {
    type: Object,
    optional: true,
    autoform: {
      blackbox: true
    }
  },
  'data._id': {
    label: "Name",
    type: String,
    autoform: {
      options: () => {
        return Datas.find().map( (c) => {
          return {label: c.name, value: c._id}
        })
      }
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      type: 'hidden'
    },
    autoValue: function () {
      if (this.isInsert) {
        return new Date()
      }
    }
  }

}))

Jobs.before.insert( (userId, doc) => {

  if (!doc.history) {
    doc.history = [{
      at: new Date(),
      status: 'created'
    }]
  }

  if (!doc.name) {
    doc.name = uuid.new()
  }

}, {fetchPrevious: false})
