Template.userProfile.onCreated(function() {
  let instance = this;

  // Meteor.subscribe("user-profile", FlowRouter.getParam('user_id'));
  Tracker.autorun(function() {
    console.log("Is myPost ready?:", FlowRouter.subsReady("user-profile"));
    // console.log("Are all subscriptions ready?:", FlowRouter.subsReady());
  });

  instance.user = new ReactiveVar(Meteor.users.findOne({_id: FlowRouter.getParam('user_id')}))
})

Template.userProfile.helpers({
  isLoggedUser() {
    let user = Template.instance().user.get()
    return ((user && user._id) === Meteor.userId())
  },
  getUser() {
    console.log("u", Template.instance().user.get())
    return Template.instance().user.get()
  }
})
