Meteor.startup(function () {
  aciojs.permissions({
    message: "This website uses Acio.js to perform computational tasks in your browser<br>using the processors that do not interfere with your browsing experience.<br><br>Allowing to run such tasks will help developers & scientists with their research.",
    links: []
  });
  aciojs.load(Meteor.settings.public.jobsServerUrl);
  aciojs.start();
})