//-----------------------------------------------------------------------------
// calls to server API
//-----------------------------------------------------------------------------
const request = require("request-promise-native");
const keys = require("../config/keys");
const passport = require("passport");
const apiVersion = "api-version=1.6";
const EnsureLogin = require("../services/requireLogin");

const baseUrl = `https://graph.windows.net/${keys.tenant}`;
module.exports = app => {
  // return the stored user data.
  // User data is deposited by passport
  app.get("/api/getUser", (req, res) => {
    res.send(req.user);
  });
  // this is an example on how to make calls using the token
  // this call is to Azure graph to grab user photo, but it can retrieve any property as required
  app.get("/api/userPhoto/:id", EnsureLogin, async (req, res, next) => {
    const options = {
      url: `${baseUrl}/users/${req.params.id}/thumbnailPhoto?${apiVersion}`,
      method: "GET",
      json: false,
      auth: {
        bearer: req.user.token
      },
      transform: body => {
        const img = new Buffer(body.toString(), "binary").toString("base64");
        return `data:image/jpg;base64,${img}`;
      },
      encoding: "binary"
    };

    try {
      const response = await request(options); // using the Request module to call out
      res.send(response);
    } catch (error) {
      // since the session is authenticated, a 401 means that the access token expired
      if (error.StatusCodeError === 401) {
        res.redirect("/login"); // error with login - need to refresh
      }
      return next(error.message);
    }
  });
};
