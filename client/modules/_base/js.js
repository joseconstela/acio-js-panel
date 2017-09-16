Template.navbar.events({
  "click .membership-demo-login": function(event, template){
    Meteor.loginWithPassword('demo@demo.com', 'demo');
  }
});
