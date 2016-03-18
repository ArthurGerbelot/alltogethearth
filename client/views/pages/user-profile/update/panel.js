Template.userPanel.helpers({
  getUserId() {
    // console.log("user panel : ", Template.instance().data.user)
    return Template.instance().data.user._id
  },
  isActive(type) {
    console.log(Template.instance().data.active, type)
    return (Template.instance().data.active === type)
  },
  countEmailNotification() {
    let count = 0
    _.each(Template.instance().data.user.emails, e => {
      if (!e.verified) {
        count++
      }
    })
    return count
  }
})