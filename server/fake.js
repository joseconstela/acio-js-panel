Meteor.startup(() => {

  if(process.env.NODE_ENV === 'development' || Meteor.settings.public.demoMode) {
    Jobs.remove({})
    JobsResults.remove({})
    Meteor.users.remove({})

    let userId = Accounts.createUser({
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
          userId: userId
        }
      ]
    })

    JobsResults.insert({
        "_id" : "5yAmmFKz2y4xBAzMd",
        "jobId" : "xxxx",
        "hashedResult" : "123435673",
        "data" : {
            "lol" : true
        },
        "resultId" : "610ff198-c7c8-48a8-99da-59b16bc8cb40",
        "createdAt" : new Date()
    })

    JobsResults.insert({
        "_id" : "5yAmmFKz2y4xBAzMe",
        "jobId" : "xxxx",
        "hashedResult" : "123435673",
        "data" : {
            "lol" : true
        },
        "resultId" : "610ff198-c7c8-48a8-99da-59b16bc8cb41",
        "createdAt" : new Date(),
    })

    JobsResults.insert({
        "_id" : "5yAmmFKz2y4xBAzMf",
        "jobId" : "xxxx",
        "hashedResult" : "123435675",
        "data" : {
            "lol" : false
        },
        "resultId" : "610ff198-c7c8-48a8-99da-59b16bc8cb42",
        "createdAt" : new Date()
    })

  }

  if (Meteor.settings.public.demoMode) {
    Accounts.config({
      forbidClientAccountCreation : true
    })
  }

})
