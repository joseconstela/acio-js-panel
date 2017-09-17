Template.datasTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this collelction?")) {
       Datas.remove({
         _id: template.data._id
       })
    }
  }
});
