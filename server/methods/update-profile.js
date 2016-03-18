Meteor.methods({
  'update-user-profile': function (user_id, values) {
    if (user_id !== Meteor.userId()) {
      throw new Meteor.Error(401, "Unauthorized")
    }

    let user = Meteor.user()
    let errors = {}

    // If new username
    if (!values.username) {
      errors.username = 'required'
    }
    if (values.username && user.profile.username !== values.username) {
      let error = getUsernameError(values.username)
      if (error) {
        errors.username = error
      }
    }

    // If error
    if (Object.keys(errors).length > 0) {
      throw new Meteor.Error(401, errors)
    }

    // Save
    let update = user.profile

    update.username =values.username
    update.firstName = values.firstName
    update.lastName = values.lastName

    Meteor.users.update({_id: user._id}, {'$set': {profile: update}})

    return {success:true}
  }
})

// Only if it's a new, so if we found it
let getUsernameError = function(value) {
  if (!validateUsername(value)) {
    return 'unvalid'
  }
  let user = Meteor.users.findOne({'profile.username': value})
  if (user) {
    return 'already-exist'
  }
  return null
}