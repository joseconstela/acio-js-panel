Jobs.before.insert(function (userId, doc) {

  // if the job to insert has a function.id, attach the entire function
  if (!!doc.function && doc.function._id) {
    doc.function = Functions.findOne({_id:doc.function._id})
  }
  
  // if the inserted job has a data.id, attach the entire data
  if (!!doc.data) {
    doc.data = Datas.findOne({_id:doc.data._id})
  }

});
