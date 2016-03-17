Template.userProfile.onCreated(function() {
  let instance = this;
  let user_id = FlowRouter.getParam('user_id')

  instance.subscribe('user-profile', user_id);

  Tracker.autorun(function() {
    instance.user = new ReactiveVar(Meteor.users.findOne({_id: user_id}))
  });

})

Template.userProfile.helpers({
  isLoggedUser() {
    let user = Template.instance().user.get()
    return ((user && user._id) === Meteor.userId())
  },
  getUser() {
    return Template.instance().user.get()
  }
})
