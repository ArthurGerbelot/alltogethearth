Template.userUpdate.onCreated(function() {
  let instance = this;
  let user_id = FlowRouter.getParam('user_id')

  instance.subscribe('user-profile', user_id);

  Tracker.autorun(function() {
    instance.user = new ReactiveVar(Meteor.users.findOne({_id: user_id}))
    console.log("Update user : ", instance.user.get())
  })
})

Template.userUpdate.helpers({
  isAuthorized() {
    let user = Template.instance().user.get()
    return ((user && user._id) === Meteor.userId())
  },
  getUser() {
    return Template.instance().user.get()
  },
  getActiveUpdate() {
    return FlowRouter.getParam('update_view')
  },
  getTemplateName() {
    return 'userUpdate' + transformFirstLetter(FlowRouter.getParam('update_view'))
  },
  getTemplateData() {
    return {
      user:  Template.instance().user.get()
    }
  },
})

function transformFirstLetter(string) {
  return string.split('-').map(s => { return capitalizeFirstLetter(s) }).join('')
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}