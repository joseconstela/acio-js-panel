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
      name: "default_job_001",
      description: "Test created by server/main.js",
      status: "working",
      code: "function getRandomInt(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;};result(getRandomInt(1,15), {reqNewJob:true});",
      history: [
        {
          status: 'working',
          at: new Date(),
          userId: userId
        }
      ]
    })

    var jobId = Jobs.insert({
      name: "default_job_002",
      description: "Test created by server/main.js",
      status: "working",
      code: "function getRandomInt(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;};result(getRandomInt(1,100), {reqNewJob:true});",
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
        "jobId" : jobId,
        "hashedResult" : "123435673",
        "data" : {
            "lol" : true
        },
        "resultId" : "610ff198-c7c8-48a8-99da-59b16bc8cb40",
        "createdAt" : new Date()
    })

    JobsResults.insert({
        "_id" : "5yAmmFKz2y4xBAzMe",
        "jobId" : jobId,
        "hashedResult" : "123435673",
        "data" : {
            "lol" : true
        },
        "resultId" : "610ff198-c7c8-48a8-99da-59b16bc8cb41",
        "createdAt" : new Date(),
    })

    JobsResults.insert({
        "_id" : "5yAmmFKz2y4xBAzMf",
        "jobId" : jobId,
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
