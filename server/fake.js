Meteor.startup(() => {

  if (process.env.NODE_ENV === 'development' ||  !!Meteor.settings.public.demoMode) {
    Functions.remove({})
    Jobs.remove({})
    Datas.remove({})
    JobsResults.remove({})
    Meteor.users.remove({})

    let userId = Accounts.createUser({
      email: 'demo@demo.com',
      password: 'demo'
    })

    let tplId = Functions.insert({
      name: 'My template',
      libraries: [
        'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.2/lodash.min.js'
      ],
      code: 'setInterval(function() {result(\'lodash\', {reqNewJob:false} );}, 300)',
      createdAt: new Date()
    })

    let dataId = Datas.insert({
      name: 'my data',
      parameters: [
        'source1',
        'source2',
        'source3'
      ],
      notes: 'lol',
      createdAt: new Date()
    })

    for (var i = 1; i <= 15; i++) {
      Jobs.insert({
        name: `Job #${i}`,
        description: `Description for #${i}`,
        function: {
          _id: tplId,
          name: 'My function',
          libraries: [
            'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.2/lodash.min.js'
          ],
          code: 'setInterval(function() {result(\'lodash\', {reqNewJob:false} );}, 300)',
          createdAt: new Date(),
        },
        data: {
          _id: dataId,
          name: 'my colelction',
          parameters: [
            'source1',
            'source2',
            'source3'
          ],
          notes: 'lol',
          createdAt: new Date()
        },
        history: [{
          at: new Date(),
          status: 'created',
          userId: 'w4foexAJ5YAxAtLT7'
        }],
        status: 'stopped',
        createdAt: new Date()
      });
    }

  }

  if (Meteor.settings.public.demoMode) {
    Accounts.config({
      forbidClientAccountCreation: true
    })
  }

})