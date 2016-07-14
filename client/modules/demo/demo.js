
Template.demo.helpers({
  processors: function(){
    var count = window.navigator.hardwareConcurrency - 1 || 1;
    var processors = [];
    for(var i = 0; i < count; i++) {
      processors.push({
        processor: i
      });
    }
    return processors;
  }
});
