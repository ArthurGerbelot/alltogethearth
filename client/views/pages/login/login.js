Template.login.onCreated(function() {
  let instance = this;
  instance.values = new ReactiveVar({})
  instance.errors = new ReactiveVar({})
  instance.has_global_error = new ReactiveVar(false)
})

Template.login.helpers({
  getValue(key) {
    let values = Template.instance().values.get()
    return values && values[key] || ''
  },
  hasError(key) {
    let errors = Template.instance().errors.get()
    return !!(errors && errors[key])
  },
  getError(key) {
    let errors = Template.instance().errors.get()
    return errors && errors[key] || ''
  },
  hasGlobalError(key) {
    console.log(Template.instance().has_global_error.get())
    return Template.instance().has_global_error.get()
  }
})

Template.login.events({
  'input .form-control'(e) {
    let instance = Template.instance()
    let field = e.currentTarget
    let values = Template.instance().values.get()
    values[field.name] = field.value
    instance.values.set(values)
  },
  'submit #page-login form'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let values = instance.values.get()

    instance.has_global_error.set(false)
    instance.errors.set({})

    let errors = getLoginError(values)
    if (Object.keys(errors).length > 0) {
      return instance.errors.set(errors)
    }

    Meteor.loginWithPassword(values.email, values.password, function(err, result) {
      if (err) {
        instance.has_global_error.set(true)
        return console.log("Login Error : ", err, err.error)
      }
      console.log("login result : ", result)
      FlowRouter.go('home')
    })
  }
})

let getLoginError = function(values) {
  let errors = {}

  if (!values.email) {
    errors.email = 'required'
  } else if (!validateEmail(values.email)) {
    errors.email = 'unvalid'
  }

  if (!values.password) {
    errors.password = 'required'
  } else if (!validatePassword(values.password)) {
    errors.password = 'unvalid'
  }

  return errors
}