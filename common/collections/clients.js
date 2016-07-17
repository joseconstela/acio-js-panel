Clients = new Mongo.Collection('Clients')

Clients.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

Clients.attachSchema(new SimpleSchema({

  _id: {
    type: String,
    optional: false
  },
  handshake: {
    type: Object,
    optional: false,
    blackbox: true
  }

}))
