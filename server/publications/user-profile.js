Meteor.publish("user-profile", function(user_id) {
  let results = [
    /* Users*/ Meteor.users.find({_id: user_id}, {fields: {services: 0}}),
  ]
  return results
});


