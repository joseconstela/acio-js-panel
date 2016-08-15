Jobs.before.insert(function (userId, doc) {
  let tplId = doc.template._id
  doc.template = Templates.findOne({_id:tplId})

  if (!!doc.collection) {
    doc.collection = Collections.findOne({_id:doc.collection._id})
  }

});
