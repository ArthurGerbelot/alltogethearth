Template.userUpdateProfile.onCreated(function() {
  let instance = this
  instance.values = new ReactiveVar({})
  instance.errors = new ReactiveVar({})
  instance.global_message = new ReactiveVar(null)
})

Template.userUpdateProfile.helpers({
  getUser() {
    return Template.instance().data.user
  },
  getUserId() {
    return Template.instance().data.user._id
  },

  // Form
  getValue(key) {
    let values = Template.instance().values.get()
    let user = Template.instance().data.user
    console.log("get value ", key, user)
    return (values && values[key]) || (user && user.profile && user.profile[key]) || ''
  },
  hasError(key) {
    let errors = Template.instance().errors.get()
    return !!(errors && errors[key])
  },
  getError(key) {
    let errors = Template.instance().errors.get()
    return errors && errors[key] || ''
  },
})

Template.userUpdateProfile.events({
  'input .form-control'(e) {
    let instance = Template.instance()
    let field = e.currentTarget
    let values = Template.instance().values.get()
    values[field.name] = field.value
    instance.values.set(values)
  },

  // Save
  'submit form': function (e) {
    e.preventDefault()
    let instance = Template.instance()
    let user = Template.instance().data.user
    let values = Template.instance().values.get()

    Meteor.call('update-user-profile', user._id, values, function (err, result) {
      if (!err && result.success) {
        console.log("Success")
      } else {
        console.log("err", err)
        console.log("result", result)
      }
    });
  },
})