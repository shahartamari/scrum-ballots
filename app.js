const express = require("express");
const socket = require("socket.io");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

server = app.listen(PORT, function() {
  console.log("server is running on port " + PORT);
});

io = socket(server);
io.on("connection", socket => {
 
  socket.on("JOIN", data => {
    if (io.nsps["/"].adapter.rooms[data.session]) {
      socket.join(data.session, () => {
        socket.emit("WELCOME");
        socket.broadcast.emit("HANDLE_JOIN", {id: data.id, name: data.name}); // let the others know that a user joined
      });
     
    } else {
      // send a failed message just to the calling socket
      socket.emit("JOIN_FAILED", {
        description: "Session " + data.session + " does not exist."
      });
      console.log( `'${data.name}' is trying to join non-existent session '${data.session}'`);
    }
  });

  socket.on("VOTE", data => {
    socket.broadcast.emit("HANDLE_VOTE", data);
    console.log(data.name + " voted " + data.vote)
  });
  socket.on("START_VOTE", data => {
    socket.broadcast.emit("START");
  });
  socket.on("STOP_VOTE", () => {
    socket.broadcast.emit("STOP_VOTE"); // send voters back to welcome screen
  });
  socket.on("CREATE", () => {
    // generate room number as rand 6 digit number
    const session = crypto.randomBytes(3).toString('hex');
    console.log('new session: ' + session);
    socket.join(session, () => {
      socket.emit("NEW_SESSION", { session });
    });
  });
});
