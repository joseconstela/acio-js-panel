
Template.demo.helpers({
  processors: function(){
    var count = window.navigator.hardwareConcurrency - 1 || 1;
    var processors = [];
    for(var i = 0; i < count; i++) {
      processors.push({
        processor: i,
        processorLabel: i + 1
      });
    }
    return processors;
  }
});

Template.demo.events({
  "click .clear-db": function(event, template){
    Cookie.clearAll();
    aciojs.deleteDatabase();
    document.location.reload(true);
  }
});
