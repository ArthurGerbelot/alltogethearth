loggedInRoutes = FlowRouter.group({
  triggersEnter: [context => {
    if (!Meteor.userId()) {
      console.warn("You cannot access to " + context.path + " without logged in");
      FlowRouter.go('authLogin');
    }
  }],
  subscriptions: function(params, queryParams) {
    this.register('me');
  }
});
notLoggedInRoutes = FlowRouter.group({
  triggersEnter: [context => {
    if(Meteor.userId()) {
      console.warn("You cannot access to " + context.path + " without logged out");
      FlowRouter.go('home');
    }
  }]
});

FlowRouter.route('/', {
  name: "home",
  action() {
    BlazeLayout.render("layout", {main: "home", hero: "heroDefault"});
  }
});
FlowRouter.route('/services', {
  name: "services",
  action() {
    BlazeLayout.render("layout", {main: "services", hero: "heroDefault"});
  }
});
FlowRouter.route('/citizens', {
  name: "citizens",
  action() {
    BlazeLayout.render("layout", {main: "citizens", hero: "heroDefault"});
  }
});


notLoggedInRoutes.route('/signup', {
  name: "signup",
  action() {
    BlazeLayout.render("layout", {main: "signup", hero: "heroDefault"});
  }
});
notLoggedInRoutes.route('/login', {
  name: "login",
  action() {
    BlazeLayout.render("layout", {main: "login", hero: "heroDefault"});
  }
});
notLoggedInRoutes.route('/forgot-password', {
  name: "forgot",
  action() {
    BlazeLayout.render("layout", {main: "forgot", hero: "heroDefault"});
  }
});
notLoggedInRoutes.route('/reset-password/:reset_token', {
  name: "reset-password",
  action() {
    BlazeLayout.render("layout", {main: "resetPassword", hero: "heroDefault"});
  }
});

loggedInRoutes.route('/user/:user_id', {
  name: "user",
  action(params) {
    BlazeLayout.render("layout", {main: "userProfile", hero: "heroUser"});
  },
})
loggedInRoutes.route('/user/:user_id/email', {
  name: "userUpdateEmail",
  action(params) {
    BlazeLayout.render("layout", {main: "userUpdateEmail", hero: "heroUser"});
  },
})
loggedInRoutes.route('/user/:user_id/password', {
  name: "userUpdatePassword",
  action(params) {
    BlazeLayout.render("layout", {main: "userUpdatePassword", hero: "heroUser"});
  },
})