Template.userUpdatePassword.helpers({
  getUser() {
    return Template.instance().data.user
  },
  getUserId() {
    return Template.instance().data.user._id
  },
})