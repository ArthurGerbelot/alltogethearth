Template.userMe.helpers({
  getEmail() {
    return Template.instance().data.user.emails[0].address
  }
})
