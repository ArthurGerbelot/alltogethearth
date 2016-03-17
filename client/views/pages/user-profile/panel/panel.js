Template.userPanel.helpers({
  getUserId() {
    return Template.instance().data.user._id
  },
  isActive(type) {
    return (Template.instance().data.active === type)
  }
})