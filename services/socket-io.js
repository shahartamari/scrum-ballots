const socketio = require("socket.io");
const crypto = require("crypto");
const format = require("biguint-format");

module.exports = server => {
  // io socket messages
  const io = socketio(server, {pingInterval: 20000, pingTimeout:10000});

  io.on("connection",  socket => {
    console.log("socket connected");
    // user is asking to join a room
    socket.on("JOIN", data => {
      if (io.nsps["/"].adapter.rooms[data.session]) {
        socket.join(data.session, () => {         
          io.in(data.session).emit("HANDLE_JOIN", {
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

    // user is asking to leave a room
    socket.on("LEAVE", data => {
      console.log(data.user.name + " is leaving session " + data.session);
      socket.leave(data.session);
    });
    socket.on("TALLY", data => {
      io.in(data.room).emit("HANDLE_TALLY", data);
    });
    socket.on("VOTE", data => {
      io.in(data.room).emit("HANDLE_VOTE", data.ballot);
      console.log(data.ballot.name + " voted " + data.ballot.vote);
    });
    socket.on("WELCOME", data => {
      io.in(data.session.id).emit("WELCOME", data.id, data.session)
    })
    socket.on("START_VOTE", room => {
      io.in(room).emit("START");
    });
    socket.on("STOP_VOTE", (room) => {
      io.in(room).emit("STOP_VOTE"); // send voters back to welcome screen
    });
    // end session and force logout everyone    
    socket.on("END", session => {
      console.log("ending session " + session);
      io.in(session).emit("END_SESSION", session);
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
    // start a check alive session for all users in the room
    socket.on("PING", (room) => {
      io.in(room).emit("PING");
    });
    // answer is coming back from connected active session
    socket.on("PONG", data => {
      io.in(data.room).emit("PONG", {id: data.user.id, name: data.user.name}); // this is answered by master 
    })
  });
};
