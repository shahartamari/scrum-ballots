const express = require("express");
const socket = require("socket.io");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

// this is for Heroku to make sure that express runs our React client
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server = app.listen(PORT, function() {
  console.log("server is running on port " + PORT);
});

io = socket(server);
io.on("connection", socket => {
  socket.on("JOIN", data => {
    if (io.nsps["/"].adapter.rooms[data.session]) {
      socket.join(data.session, () => {
        socket.emit("WELCOME");
        socket.broadcast.emit("HANDLE_JOIN", { id: data.id, name: data.name }); // let the others know that a user joined
      });
    } else {
      // send a failed message just to the calling socket
      socket.emit("JOIN_FAILED", {
        description: "Session " + data.session + " does not exist."
      });
      console.log(
        `'${data.name}' is trying to join non-existent session '${data.session}'`
      );
    }
  });
  socket.on("LEAVE", data => {
    console.log(data.user.name + " is leaving session " + data.session);
    socket.leave(data.session);
  });
  socket.on("TALLY", data => {
    socket.broadcast.emit("HANDLE_TALLY", data);
  });
  socket.on("VOTE", data => {
    socket.broadcast.emit("HANDLE_VOTE", data);
    console.log(data.name + " voted " + data.vote);
  });
  socket.on("START_VOTE", data => {
    socket.broadcast.emit("START");
  });
  socket.on("STOP_VOTE", () => {
    socket.broadcast.emit("STOP_VOTE"); // send voters back to welcome screen
  });
  socket.on("END", session => {
    console.log("ending session " + session);
    socket.broadcast.emit("END_SESSION", session);
    socket.leave(session);
  });
  socket.on("CREATE", () => {
    // generate room number as rand 6 digit number
    const session = crypto.randomBytes(3).toString("hex");
    console.log("new session: " + session);
    socket.join(session, () => {
      socket.emit("NEW_SESSION", { session });
    });
  });
});
