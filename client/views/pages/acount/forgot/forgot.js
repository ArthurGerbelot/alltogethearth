Template.forgot.onCreated(function() {
  let instance = this;
  instance.values = new ReactiveVar({})
  instance.errors = new ReactiveVar({})
  instance.has_global_success_message = new ReactiveVar(false)
})

Template.forgot.helpers({
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
  hasSuccessMessage(key) {
    console.log(Template.instance().has_global_success_message.get())
    return Template.instance().has_global_success_message.get()
  }
})

Template.forgot.events({
  'input .form-control'(e) {
    let instance = Template.instance()
    let field = e.currentTarget
    let values = Template.instance().values.get()
    values[field.name] = field.value
    instance.values.set(values)
  },
  'submit #page-forgot form'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let values = instance.values.get()
    let errors = {}
    console.log("forgot", values)

    instance.has_global_success_message.set(false)
    instance.errors.set(errors)
    console.log("forgot errors", errors)

    if (!values.email) {
      errors.email = 'required'
    } else if (!validateEmail(values.email)) {
      errors.email = 'unvalid'
    }

    if (Object.keys(errors).length > 0) {
      return instance.errors.set(errors)
    }

    Accounts.forgotPassword(values, function(err, result) {
      // error or not, display success message
      instance.has_global_success_message.set(true)
    })
  }
})
