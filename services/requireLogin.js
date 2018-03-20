module.exports = (req, res, next) => {
  console.log('ensure middleware');
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/login");
}
