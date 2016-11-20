Jobs.before.insert(function (userId, doc) {

  // if the job to insert has a template.id, attach the entire template
  if (!!doc.template && doc.template._id) {
    doc.template = Templates.findOne({_id:doc.template._id})
  }
  
  // if the inserted job has a collection.id, attach the entire collection
  if (!!doc.collection) {
    doc.collection = Collections.findOne({_id:doc.collection._id})
  }

});
