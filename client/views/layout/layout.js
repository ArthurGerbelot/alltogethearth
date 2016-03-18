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

  instance.subnav_user_account_is_open = new ReactiveVar(false)
})

Template.layout.helpers({
  getLayoutClass() {
    return Template.instance().layout_class.get()
  },
  subnavUserAccountIsOpen() {
    return Template.instance().subnav_user_account_is_open.get()
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
  },
  'click #layout-nav .nav-link.user-account'(e) {
    Template.instance().subnav_user_account_is_open.set(true)
    e.stopPropagation()
  },
  'click #layout-wrapper'() {
    Template.instance().subnav_user_account_is_open.set(false)
  },

  'click .subnav-link--logout'(e) {
    e.preventDefault()
    Meteor.logout(function(err) {
      // callback
      FlowRouter.go('home')
    });
  }
})


Template.registerHelper('getProjectName', function() {
  return new Spacebars.SafeString("<span class='project-name'>All Togeth'<span>Earth</span></span>");
});
Template.registerHelper('isLogged', function() {
  return !!Meteor.userId()
});
Template.registerHelper('isntLogged', function() {
  return !Meteor.userId()
});
Template.registerHelper('getMe', function() {
  console.log(Meteor.user())
  return Meteor.user()
});
Template.registerHelper('getMyId', function() {
  console.log(Meteor.user())
  return Meteor.userId()
});
Template.registerHelper('getDisplayName', function() {
  let user = Meteor.user()
  return getDisplayName(user)
});
Template.registerHelper('equals', function (a, b) {
  return a === b;
});
Template.registerHelper('notequals', function (a, b) {
  return a !== b;
});


Avatar.setOptions({
  gravatarDefault: "identicon",
  // customImageProperty() {
  //   return null
  //   // return this.avatar_url {this : user}
  // }
});

getDisplayName = function(user) {
  if (user && user.profile) {
    if (user.profile.username) {
      return user.profile.username
    }
    if (user.profile.firstName && user.profile.lastName) {
      return user.profile.firstName + " " + user.profile.lastName
    }
  }
  if (user && user.emails && user.emails[0] && user.emails[0].address) {
    returnuser.emails[0].address
  }
  return "?"
}