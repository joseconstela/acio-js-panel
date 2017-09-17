Datas = new Mongo.Collection('Datas')

Datas.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

Datas.attachSchema(new SimpleSchema({

  name: {
    type: String,
    optional: false
  },
  parameters: {
    label: "Arguments",
    type: Array,
    optional: true,
    autoform: {
      help: "Available via process.argv - each execution receives 1 single argument from this list",
      template: 'simpleArray',
      placeholder: "x"
    }
  },
  'parameters.$': {
    type: String,
    optional: true,
    autoform: {
      placeholder: "https://.../samples/0001.xml"
    }
  },
  notes: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 5
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
