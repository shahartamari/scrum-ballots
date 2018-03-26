const socketio = require("socket.io");
const crypto = require("crypto");
const format = require("biguint-format");

module.exports = server => {
  // io socket messages
  const io = socketio(server);

  io.on("connection",  socket => {
    console.log("socket connected");
    socket.on("JOIN", data => {
      if (io.nsps["/"].adapter.rooms[data.session]) {
        socket.join(data.session, () => {         
          socket.broadcast.emit("HANDLE_JOIN", {
            id: data.id,
            name: data.name
          }); // let the others know that a user joined
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
    socket.on("WELCOME", data => {
      socket.broadcast.emit("WELCOME", data.id, data.session)
    })
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
      const session = format(crypto.randomBytes(3), 'dec');
      console.log("new session: " + session);
      socket.join(session, () => {
        socket.emit("NEW_SESSION", { session });
      });
    });
  });
};
