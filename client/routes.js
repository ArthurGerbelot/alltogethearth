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