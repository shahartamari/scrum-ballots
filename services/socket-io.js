//-----------------------------------------------------------------------------
// create an instance of socket IO server
// 
// clients will emit messesages to this server.  The server uses
// the emmited messages to connect back to all clients in the session.
// This module uses the concept of 'rooms' to isolate clients in different
// scrum sessions. 
//
// Some of the messages are only handled by the participants, while others
// are handled by the master.  But all messages are broadcasted in the room.
//-----------------------------------------------------------------------------

const socketio = require("socket.io");
const crypto = require("crypto");
const format = require("biguint-format");

module.exports = server => {
  // io socket messages
  const io = socketio(server, {pingInterval: 20000, pingTimeout:2000});

  io.on("connection",  socket => {
    console.log("socket connected");
    // user is asking to join a session (room)
    // if the room exists, then send a message back to he master 
    // to handle adding the user into the user store
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
    // vote count screen calculated vote tally
    // the data is transmitted back to the room to show on tally screens
    socket.on("TALLY", data => {
      io.in(data.room).emit("HANDLE_TALLY", data);
    });
     // user voted on a question
    // message is sent back to the master to add vote to add to tally
    socket.on("VOTE", data => {
      io.in(data.room).emit("HANDLE_VOTE", data.ballot);
      console.log(data.ballot.name + " voted " + data.ballot.vote);
    });
    // message is sent by the master after a user successfully joined a session
    // the user withthe right id handles this by moving on to Welcome screen
    socket.on("WELCOME", data => {
      io.in(data.session.id).emit("WELCOME", data.id, data.session)
    })
    // Scrum master presses the start vote button to send this message
    // this sends connected sessions a signal to start voting
    socket.on("START_VOTE", room => {
      io.in(room).emit("START");
    });
    // Scrum master presses the Stop vote button to send this message
    // this sends an indication to connected clients to return to Welcome screen
    socket.on("STOP_VOTE", (room) => {
      io.in(room).emit("STOP_VOTE"); // send voters back to welcome screen
    });
    // end session and return all connected sessions to home screen    
    socket.on("END", session => {
      console.log("ending session " + session);
      io.in(session).emit("END_SESSION", session);
      socket.leave(session);
    });
    // Scrum master creates a new session
    // generate session ID and open a new room
    socket.on("CREATE", () => {
      // generate room number as rand 6 digit number
      const session = format(crypto.randomBytes(3), 'dec');
      console.log("new session: " + session);
      socket.join(session, () => {
        socket.emit("NEW_SESSION", { session });
      });
    });
    // start a check-alive session for all users in the room
    socket.on("PING", (room) => {
      io.in(room).emit("PING");
    });
    // answer is coming back from connected active session
    // master will be adding the connected user back to the active list
    socket.on("PONG", data => {
      io.in(data.room).emit("PONG", {id: data.user.id, name: data.user.name});
    })
  });
};
