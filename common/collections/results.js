JobsResults = new Mongo.Collection('JobsResults')

JobsResults.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
})

JobsResults.attachSchema(new SimpleSchema({

  jobId: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden'
    }
  },
  hashedResult: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden'
    }
  },
  data: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
    autoform: {
      type: 'hidden'
    },
    autoValue: function () {
      if (!this.isSet) {
        return new Date()
      }
    }
  }

}))
