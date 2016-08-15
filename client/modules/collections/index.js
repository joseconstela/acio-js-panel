Template.collectionsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this collelction?")) {
       Collections.remove({
         _id: template.data._id
       })
    }
  }
});
