Template.registerHelper('currentRouteIs', (name) => {
  try {
    return Router.current().route.getName().indexOf(name) === 0;
  } catch (Ex) {
    return false;
  }
});

Template.registerHelper('absoluteUrl', (subfix) => {
  return Meteor.absoluteUrl() + subfix || '';
});

Template.registerHelper('debug', (optionalValue) => {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

Template.registerHelper('equal', (terma, termb) => {
  return terma === termb
});

Template.registerHelper('jsonPretty', function(data){
  return JSON.stringify(data, null, 2);
});
