Meteor.startup(() => {

  if(process.env.NODE_ENV === 'development' || !!Meteor.settings.public.demoMode) {
    /*Jobs.remove({})
    JobsResults.remove({})
    Meteor.users.remove({})

    console.log('fake');

    let userId = Accounts.createUser({
      email : 'demo@demo.com',
      password : 'demo'
    })

    for(var i = 0;i<=9;i++)
    Jobs.insert({
      name: "default_job_00"+i+"-RANDOM",
      description: "Test created by server/fake.js",
      status: "stopped",
      code: `setInterval(function() {result(1, {reqNewJob:false} );}, 1000)`,
      history: [
        {
          status: 'stopped',
          at: new Date(),
          userId: userId
        }
      ]
    })*/

  }

  if (Meteor.settings.public.demoMode) {
    Accounts.config({
      forbidClientAccountCreation : true
    })
  }

})
