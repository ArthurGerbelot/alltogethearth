Template.userUpdatePhone.onCreated(function() {
  let instance = this
  instance.new_phones = new ReactiveVar([])
  instance.global_message = new ReactiveVar(null)
})


Template.userUpdatePhone.helpers({
  getUser() {
    console.log("Phone user : ",Template.instance().data.user)
    return Template.instance().data.user
  },
  getUserId() {
    return Template.instance().data.user._id
  },
  // Existing phones
  getUserPhones() {
    return Template.instance().data.user.phones
  },
  haveMultiplePhones() {
    return (Template.instance().data.user.phones.length > 1)
  },

  // New phones
  getUserNewPhones() {
    return Template.instance().new_phones.get()
  }
})

Template.userUpdatePhone.events({
  'click .action-verify'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let phone = this
    console.log("Verify ", phone)
    alert("@TODO");
  },
  'click .action-remove'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let phone = this
    console.log("remove ", phone)

    Meteor.call('update-user-remove-phone', instance.data.user._id, phone)
  },
  'click .set-primary'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let phone = this
    console.log("set primary ", phone)

    Meteor.call('update-user-set-primary-phone', instance.data.user._id, phone)
  },

  'input .new-phone input'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let new_phones = instance.new_phones.get()
    console.log("before", new_phones)
    let index = e.currentTarget.getAttribute('data-index')
    console.log("index", index)
    console.log("e.currentTarget.value", e.currentTarget.value)

    new_phones[index][e.currentTarget.name] = e.currentTarget.value
    new_phones[index].error = null

    console.log("updated", new_phones)
    instance.new_phones.set(new_phones)
  },
  'click .button--create'(e) {
    e.preventDefault()
    let instance = Template.instance()
    let new_phones = instance.new_phones.get()
    let index = e.currentTarget.getAttribute('data-index')
    console.log("Create ", new_phones[index], " on ", index)

    delete new_phones[index].error

    Meteor.call('update-user-add-phone', instance.data.user._id, new_phones[index], function (err, result) {
      if (err) {
        new_phones[index].error = err.reason
        instance.new_phones.set(new_phones)
        return
      }
      new_phones.splice(index, 1)
      instance.new_phones.set(new_phones)
      console.log("Success")
    });
  },
  'click .box-listing-item--more'(e) {
    e.preventDefault()
    console.log('heu ?')
    let instance = Template.instance()
    let new_phones = instance.new_phones.get()
    new_phones.push({
      number: '',
      countryCode: '+1',
      error: null
    })
    console.log(new_phones)
    instance.new_phones.set(new_phones)
  }
})