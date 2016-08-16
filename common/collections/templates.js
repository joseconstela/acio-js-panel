Templates = new Mongo.Collection('Templates')

Templates.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

Templates.attachSchema(new SimpleSchema({

  name: {
    type: String,
    optional: false
  },
  libraries: {
    label: "External libraries",
    type: Array,
    optional: true,
    autoform: {
      help: "will be loaded before the code execution",
      template: 'simpleArray',
      placeholder: "x"
    }
  },
  'libraries.$': {
    type: String,
    optional: true,
    autoform: {
      placeholder: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js"
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