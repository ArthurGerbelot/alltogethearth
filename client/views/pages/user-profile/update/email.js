Template.userUpdateEmail.onCreated(function() {
  let instance = this
  instance.new_emails = new ReactiveVar([])
  instance.global_message = new ReactiveVar(null)
})


Template.userUpdateEmail.helpers({
  getUser() {
    console.log("Email user : ",Template.instance().data.user)
    return Template.instance().data.user
  },
  getUserId() {
    return Template.instance().data.user._id
  },
  // Existing emails
  getUserEmails() {
    return Template.instance().data.user.emails
  },
  haveMultipleEmails() {
    return (Template.instance().data.user.emails.length > 1)
  },
  canRemove() {
    let email = this
    return !email.primary && (Template.instance().data.user.emails.length > 1)
  },

  // New emails
  getUserNewEmails() {
    return Template.instance().new_emails.get()
  }
})

Template.userUpdateEmail.events({
  'click .action-verify'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let email = this
    console.log("Verify ", email)
    alert("@TODO");
  },
  'click .action-remove'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let email = this
    console.log("remove ", email)

    Meteor.call('update-user-remove-email', instance.data.user._id, email.address)
  },
  'click .set-primary'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let email = this
    console.log("set primary ", email)

    Meteor.call('update-user-set-primary-email', instance.data.user._id, email.address)
  },

  'input .new-email input'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let new_emails = instance.new_emails.get()
    console.log("before", new_emails)
    let index = e.currentTarget.getAttribute('data-index')
    console.log("index", index)
    console.log("e.currentTarget.value", e.currentTarget.value)
    new_emails[index] = {
      address: e.currentTarget.value,
      error: null
    }
    console.log("updated", new_emails)
    instance.new_emails.set(new_emails)
  },
  'click .button--create'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let new_emails = instance.new_emails.get()
    let index = e.currentTarget.getAttribute('data-index')
    console.log("Create ", new_emails[index], " on ", index)

    Meteor.call('update-user-add-email', instance.data.user._id, new_emails[index].address, function (err, result) {
      if (err) {
        new_emails[index].error = err.reason
        instance.new_emails.set(new_emails)
        return
      }
      new_emails.splice(index, 1)
      instance.new_emails.set(new_emails)
      console.log("Success")
    });
  },
  'click .box-listing-item--more'(e) {
    e.preventDefault()
    console.log('heu ?')
    let instance = Template.instance()
    let new_emails = instance.new_emails.get()
    new_emails.push({
      address: '',
      error: null
    })
    console.log(new_emails)
    instance.new_emails.set(new_emails)
  }
})