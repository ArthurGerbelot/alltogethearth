validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
validatePassword = function(password) {
    return password.length >= 6
}
validateUsername = function(username) {
    return username.length >= 2 && username.length <= 30
}
validatePhone = function(phone) {
  if (!phone || !phone.number) {
    return false
  }
  var re = /^([0-9]{8,14})$/;
  return re.test(phone.number);
}