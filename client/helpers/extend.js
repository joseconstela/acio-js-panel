Template.registerHelper("keyArrayFieldName", function(subfix){
  return this.name + '.key'
});
Template.registerHelper("valueArrayFieldName", function(subfix){
  return this.name + '.value'
});
