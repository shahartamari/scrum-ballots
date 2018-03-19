const ensureLogin = require('../services/requireLogin.js');

module.exports = app => {
   
    app.get("/api/getUser", (req, res) => {
        res.send(req.user);
    })
}