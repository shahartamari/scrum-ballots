const passport = require("passport");
const OIDCStrategy = require("passport-azure-ad").OIDCStrategy;
const keys = require("../config/keys");

/******************************************************************************
 * Set up passport in the app 
 ******************************************************************************/

//-----------------------------------------------------------------------------
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.  Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
//-----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
  done(null, user.oid);
});

passport.deserializeUser(function(oid, done) {
  findByOid(oid, function(err, user) {
    done(err, user);
  });
});

// array to hold logged in users
var users = [];

var findByOid = function(oid, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.oid === oid) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

//-----------------------------------------------------------------------------
// Use the OIDCStrategy within Passport.
//
// Strategies in passport require a `verify` function, which accepts credentials
// (in this case, the `oid` claim in id_token), and invoke a callback to find
// the corresponding user object.
//
// The following are the accepted prototypes for the `verify` function
// (1) function(iss, sub, done)
// (2) function(iss, sub, profile, done)
// (3) function(iss, sub, profile, access_token, refresh_token, done)
// (4) function(iss, sub, profile, access_token, refresh_token, params, done)
// (5) function(iss, sub, profile, jwtClaims, access_token, refresh_token, params, done)
// (6) prototype (1)-(5) with an additional `req` parameter as the first parameter
//
// To do prototype (6), passReqToCallback must be set to true in the config.
//-----------------------------------------------------------------------------
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: keys.identityMetadata,
      clientID: keys.clientID,
      responseType: keys.responseType,
      responseMode: keys.responseMode,
      redirectUrl: keys.url + "/auth/openid/return",
      validateIssuer: true,
      issuer: keys.url,
      passReqToCallback: false,
      allowHttpForRedirectUrl: keys.allowHttpForRedirectUrl,
      clientSecret: keys.clientSecret,
      loggingLevel: "info",
      scope: ['user_impersonation' ,'openid']
    },
    function(iss, sub, profile, accessToken, refreshToken, done) {
       // Store token in profile
       const fullProfile = profile;
       fullProfile.token = accessToken;

      if (!profile.oid) {
        return done(new Error("No oid found"), null);
      }
      // asynchronous verification, for effect...
      process.nextTick(function() {
        findByOid(profile.oid, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            // "Auto-registration"
            users.push(fullProfile);
            
          } else {
            // refresh the token
            users[users.indexOf(user)] = fullProfile;
          }
          return done(null, fullProfile);
        });
      });
    }
  )
);
