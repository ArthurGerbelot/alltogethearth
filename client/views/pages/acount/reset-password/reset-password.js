Template.resetPassword.onCreated(function() {
  let instance = this;
  instance.values = new ReactiveVar({})
  instance.errors = new ReactiveVar({})
})

Template.resetPassword.helpers({
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
  getResetToken() {
    return FlowRouter.getParam('reset_token')
  }
})

Template.resetPassword.events({
  'input .form-control'(e) {
    let instance = Template.instance()
    let field = e.currentTarget
    let values = Template.instance().values.get()
    values[field.name] = field.value
    instance.values.set(values)
  },
  'submit #page-reset-password form'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let values = instance.values.get()

    values.reset_token = FlowRouter.getParam('reset_token')

    Meteor.call('reset-password', values, function(err, result) {
      if (err) {
        console.warn("reset password Error : ", err, err.error)
        return instance.errors.set(err.error)
      }
      FlowRouter.go('login')
    })
  }
})