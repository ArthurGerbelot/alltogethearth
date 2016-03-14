
/* Emails */
Accounts.emailTemplates.siteName = "All Togeth'Earth";
Accounts.emailTemplates.from = "All Togeth'Earth <no-reply@alltogethearth.com>";
Accounts.emailTemplates.resetPassword.text = function(user, url) {
  // Don't know why reset-password url come with /#/ on start
  url = url.replace('/#/reset-password', '/reset-password')
  return "To reset your password, simply click the link below. " + url ;
}