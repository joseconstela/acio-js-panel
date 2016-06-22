Meteor.startup(() => {

  if(process.env.NODE_ENV === 'development'){
    Jobs.remove({})
    JobsResults.remove({})
    Meteor.users.remove({})

    Accounts.createUser({
      email : 'admin@admin.com',
      password : 'admin'
    })

    Jobs.insert({
      jobId: "xxxx",
      name: "name",
      description: "Test created by server/main.js",
      status: "working",
      code: "wqResult([1,2,3,4])",
      history: [
        {
          status: 'working',
          at: new Date(),
          comment: 'created from server faker'
        }
      ]
    })

    JobsResults.insert({
      jobId: "xxxx",
      hashedResult: '123435673',
      data: {
        lol: true
      }
    })
  }

})
