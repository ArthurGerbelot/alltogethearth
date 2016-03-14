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
    console.log("Errors: ", errors)

    if (Object.keys(errors).length > 0) {
    console.log("Errors: ", errors)
      throw new Meteor.Error(errors)
    }

    console.log("Create: ", opts)

    Accounts.createUser({
      email: opts.email,
      password: opts.password
    });
    return {success: true}
  },
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePassword(password) {
    return password.length >= 6
}