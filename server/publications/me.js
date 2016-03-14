Meteor.publish("me", function() {
  let results = [
    /* Users*/ Meteor.users.find({_id: this.userId}),
  ]
  return results
});


