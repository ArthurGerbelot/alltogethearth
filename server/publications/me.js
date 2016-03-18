Meteor.publish("me", function() {
  let results = [
    /* Users*/ Meteor.users.find({_id: this.userId}, {fields: {services: 0}}),
  ]
  return results
});


