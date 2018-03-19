const passport = require("passport");
const keys = require("../config/keys");

module.exports = app => {
  app.get('/login',
  function(req, res, next) {
    console.log('trying to authenticate');
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        resourceURL: null,    // optional. Provide a value if you want to specify the resource.
        customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
        failureRedirect: '/' 
      }
    )(req, res, next);
  });

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.get('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/');
  });

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.post('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/');
  });

  // 'logout' route, logout from passport, and destroy the session with AAD.
  app.get("/api/logout", function(req, res) {
    req.session.destroy(function(err) {
      req.logOut();
      res.send("https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=" + req.get('host') );
    // res.redirect('/');
    });
  });
};
