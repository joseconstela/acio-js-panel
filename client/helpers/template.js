Template.registerHelper('currentRouteIs', (name) => {
  try {
    return Router.current().route.getName().indexOf(name) === 0;
  } catch (Ex) {
    return false;
  }
})

Template.registerHelper('length', (arr) => {
  return arr.length
})

Template.registerHelper('demoMode', () => {
  return Meteor.settings.public.demoMode
})

Template.registerHelper('jobsServerUrl', () => {
  return Meteor.settings.public.jobsServerUrl
})

Template.registerHelper('absoluteUrl', (subfix) => {
  return Meteor.absoluteUrl() + subfix || ''
})

Template.registerHelper('debug', (optionalValue) => {
  console.log("Current Context")
  console.log("====================")
  console.log(this)

  if (optionalValue) {
    console.log("Value")
    console.log("====================")
    console.log(optionalValue)
  }
})

Template.registerHelper('equal', (terma, termb) => {
  return terma === termb
})

Template.registerHelper('jsonPretty', (data) => {
  return JSON.stringify(data, null, 2)
})

Template.registerHelper('jobIsRunning', (job) => {
  return job.status === 'working';
})

Template.registerHelper('jobIsRunningCssClass', (job) => {
  return job.status === 'working' ? 'success' : 'danger';
})
