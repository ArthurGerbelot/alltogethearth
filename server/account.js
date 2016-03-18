Accounts.onCreateUser(function (options, user) {

  console.log("USer created")
  console.log("options",options)
  console.log("user",user)

  user.profile = options.profile ? options.profile : {}
  user.emails[0].primary = true

  return user
})