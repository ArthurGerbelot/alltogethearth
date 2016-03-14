loggedInRoutes = FlowRouter.group({
  triggersEnter: [context => {
    if (!Meteor.userId()) {
      console.warn("You cannot access to " + context.path + " without logged in");
      FlowRouter.go('authLogin');
    }
  }]
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
    BlazeLayout.render("layout", {main: "home"});
  }
});
FlowRouter.route('/services', {
  name: "services",
  action() {
    BlazeLayout.render("layout", {main: "services"});
  }
});
FlowRouter.route('/citizens', {
  name: "citizens",
  action() {
    BlazeLayout.render("layout", {main: "citizens"});
  }
});


notLoggedInRoutes.route('/signup', {
  name: "signup",
  action() {
    BlazeLayout.render("layout", {main: "signup"});
  }
});
notLoggedInRoutes.route('/login', {
  name: "login",
  action() {
    BlazeLayout.render("layout", {main: "login"});
  }
});
notLoggedInRoutes.route('/forgot-password', {
  name: "forgot",
  action() {
    BlazeLayout.render("layout", {main: "forgot"});
  }
});
notLoggedInRoutes.route('/reset-password/:reset_token', {
  name: "reset-password",
  action() {
    BlazeLayout.render("layout", {main: "resetPassword"});
  }
});

loggedInRoutes.route('/user/:user_id', {
  name: "user",
  action(params) {
    BlazeLayout.render("layout", {main: "user"});
  }
})