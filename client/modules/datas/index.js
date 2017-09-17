Template.datasTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this data set?")) {
       Datas.remove({
         _id: template.data._id
       })
    }
  }
});
