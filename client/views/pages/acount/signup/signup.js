Template.signup.onCreated(function() {
  let instance = this;
  instance.values = new ReactiveVar({})
  instance.errors = new ReactiveVar({})
})

Template.signup.helpers({
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
  }
})

Template.signup.events({
  'input .form-control'(e) {
    let instance = Template.instance()
    let field = e.currentTarget
    let values = Template.instance().values.get()
    values[field.name] = field.value
    instance.values.set(values)
  },
  'submit #page-signup form'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let values = instance.values.get()

    Meteor.call('signup', values, function(err, result) {
      if (err) {
        if (err.reason) {
          let errors = instance.errors.get()
          errors.email = err.reason
          instance.errors.set(errors)
        } else {
          instance.errors.set(err.error)
        }
        return;
      }
      console.log("Signup Result : ", result)
      Meteor.loginWithPassword(values.email, values.password, function(err, result) {
        if (err) {
          return console.log("Login Error : ", err, err.error)
        }
        console.log("login result : ", result)
        FlowRouter.go('user', {user_id: Meteor.userId()})
      })
    })
  }
})