Meteor.methods({

  // Profile
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

    update.username = values.username
    update.firstName = values.firstName
    update.lastName = values.lastName

    Meteor.users.update({_id: user._id}, {'$set': {profile: update}})

    return {success:true}
  },

  // Email
  'update-user-add-email': function (user_id, email) {
    if (user_id !== Meteor.userId()) {
      throw new Meteor.Error(401, "Unauthorized")
    }

    let user = Meteor.user()
    let error = null

    if (!email) {
      error = 'required'
    }
    else if (!validateEmail(email)) {
      error = 'unvalid'
    }
    // If error
    if (error) {
      throw new Meteor.Error(401, error)
    }
    // Valid email, check if already exist
    Accounts.addEmail(user_id, email)

    return {success:true}
  },
  'update-user-remove-email': function (user_id, email) {
    if (user_id !== Meteor.userId()) {
      throw new Meteor.Error(401, "Unauthorized")
    }

    Accounts.removeEmail(user_id, email)

    return {success:true}
  },
  'update-user-set-primary-email': function (user_id, email) {
    if (user_id !== Meteor.userId()) {
      throw new Meteor.Error(401, "Unauthorized")
    }

    let user = Meteor.user()
    let error = null

    let update = user.emails.map(e => {
      if (e.primary) {
        delete e.primary
      }
      if (e.address === email) {
        e.primary = true
      }
      return e
    })
    Meteor.users.update({_id: user._id}, {'$set': {emails: update}})
    return {success:true}
  },

  // Phones
  'update-user-add-phone': function (user_id, phone) {
    if (user_id !== Meteor.userId()) {
      throw new Meteor.Error(401, "Unauthorized")
    }
    console.log("Add phone : ", phone)

    let user = Meteor.user()
    let error = null

    if (!phone.number) {
      error = 'required'
    }
    else if (!validatePhone(phone)) {
      error = 'unvalid'
    }
    // If error
    if (error) {
      throw new Meteor.Error(401, error)
    }

    let usserSamePhone = Meteor.users.find({'phones.number': phone.number, 'phones.countryCode': phone.countryCode}).fetch()
    console.log("usserSamePhone", usserSamePhone)
    if (usserSamePhone.length > 0) {
      throw new Meteor.Error(401, "already-exist")
    }
    let new_phone = {
      number: phone.number,
      countryCode: phone.countryCode,
      primary: (user.phones.length === 0),
      verified: false,
    }
    user.phones.push(new_phone)
    Meteor.users.update({_id: user._id},{'$set': {phones: user.phones}})

    return {success:true}
  },
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