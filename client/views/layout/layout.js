Template.layout.onCreated(function() {
  let instance = this;
  let is_intro = (FlowRouter.getRouteName() === 'home')
  let layout_class = ''

  if (is_intro) {
    layout_class = 'before-intro'
    Meteor.setTimeout(function() {
      instance.layout_class.set('intro')
      console.log("layout class = ", layout_class)
    }, 1000)
  }
  console.log("layout class = ", layout_class)
  instance.layout_class = new ReactiveVar(layout_class)
})

Template.layout.helpers({
  getLayoutClass() {
    return Template.instance().layout_class.get()
  }
})

Template.layout.events({
  'click .intro-btn'() {
    let instance = Template.instance()
    instance.layout_class.set('after-intro')
    // After 2s remove this class, `.after-intro` are used only to put deplay-transition we dont want after that
    Meteor.setTimeout(function() {
      console.log("Timeout")
      instance.layout_class.set('')
    }, 2000)
  }
})


Template.registerHelper('getProjectName', function() {
  return new Spacebars.SafeString("<span class='project-name'>All Togeth'<span>Earth</span></span>");
});