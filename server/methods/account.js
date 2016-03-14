Meteor.methods({
  'signup': function (opts) {

    console.log("Validate signup : ", opts)

    let errors = {}

    // Validate email
    if (!opts.email) {
      errors.email = 'required'
    } else if (!validateEmail(opts.email)) {
      errors.email = 'unvalid'
    }

    // Validate password
    validateBothPasswords(opts, errors)
    console.log("Errors: ", errors)

    if (Object.keys(errors).length > 0) {
    console.log("Errors: ", errors)
      throw new Meteor.Error(errors)
    }

    console.log("Create: ", opts)

    let user_id = Accounts.createUser({
      email: opts.email,
      password: opts.password
    });

    // Accounts.sendVerificationEmail(user_id);

    return {success: true}
  },
  'reset-password': function (opts) {

    console.log("Validate reset password : ", opts)

    let errors = {}

    // Validate password
    validateBothPasswords(opts, errors)
    console.log("Errors: ", errors)

    // Send error a first time if password test fail, before take a look to the database
    if (Object.keys(errors).length > 0) {
    console.log("Errors: ", errors)
      throw new Meteor.Error(errors)
    }

    let user = Meteor.users.findOne({'services.password.reset.token': opts.reset_token})
    console.log("User found : ", user)
    if (!user) {
      errors.token = 'not-found'
    }
    else if (user.services.password.reset.token < new Date()) {
      errors.token = 'timeout-expired'
    }

    if (Object.keys(errors).length > 0) {
    console.log("Errors: ", errors)
      throw new Meteor.Error(errors)
    }

    console.log("reset: ", opts)

    Accounts.setPassword(user._id, opts.password)

    // Accounts.sendVerificationEmail(user_id);

    return {success: true}
  },
});

validateBothPasswords = function(opts, errors) {
  if (!opts.password || !opts['confirm-password']) {
    if (!opts.password) {
      errors.password = 'required'
    }
    if (!opts['confirm-password']) {
      errors['confirm-password'] = 'required'
    }
  } else {
    let p_valid = validatePassword(opts.password)
    let cp_valid = validatePassword(opts['confirm-password'])

    if (!p_valid || !cp_valid) {
      if (!p_valid) {
        errors.password = 'unvalid'
      }
      if (!cp_valid) {
        errors['confirm-password'] = 'unvalid'
      }
    } else if (opts.password !== opts['confirm-password']) {
      errors.password = 'not-equal'
      errors['confirm-password'] = 'not-equal'
    }
  }
}