Template.home.onCreated(function() {
  let instance = this;

  instance.brief_class = new ReactiveVar('')
})

Template.home.helpers({
  getBriefClass() {
    return Template.instance().brief_class.get()
  }
})

Template.home.events({
  'click .brief-wrapper .button--open-brief'() {
    let instance = Template.instance()
    // if (!instance.brief_class.get()) {
    //   instance.brief_class.set('is-opening-brief')
    //   Meteor.setTimeout(function() {
        instance.brief_class.set('is-visible-brief')
    //   }, 1000)
    // }
  },
  'click .brief-wrapper .close-brief'() {
    let instance = Template.instance()

    // if (instance.brief_class.get() === 'is-visible-brief') {
    //   instance.brief_class.set('is-closing-brief')
    //   Meteor.setTimeout(function() {
        instance.brief_class.set('')
    //   }, 1000)
    // }
  },
})