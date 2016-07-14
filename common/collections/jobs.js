Jobs = new Mongo.Collection('Jobs')

Jobs.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

Jobs.attachSchema(new SimpleSchema({

  name: {
    type: String,
    optional: false
  },
  description: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea',
      rows: 2
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
    allowedValues: ['created', 'stopped', 'working', 'finished', 'updated']
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
  code: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 10,
        class: "codemirror"
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
