Template.site.events({
  "click .membership-demo-login": function(event, template){
    Meteor.loginWithPassword('admin@admin.com', 'admin');
  }
});