module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '帳號或密碼錯誤！')
    res.redirect('/users/login')
  }
}