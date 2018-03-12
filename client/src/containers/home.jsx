import React from "react";
import JoinScrum from "../components/joinscrum";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { join, new_session } from "../actions";

const Home = ({ socket, onJoinSession }) => {
  function joinSession(name, session) {
    const id =
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36);
    socket.emit("JOIN", {
      id,
      name,
      session
    });
    onJoinSession(id, name, session);
  }
  return (
    <div>
      <JoinScrum handleJoin={joinSession} socket={socket} />
      <div className="hide-on-small-only">
        <div className="section">
          <Link to="/start">I want to start my own session</Link>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    onJoinSession: (id, name, session) => {
      dispatch(new_session(session, null));
      dispatch(join(id, name));
    }
  };
};
export default connect(null, mapDispatchToProps)(Home);
