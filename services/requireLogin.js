//-----------------------------------------------------------------------------
//  Middleware to add to any function that requires login
//-----------------------------------------------------------------------------
module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');  
};