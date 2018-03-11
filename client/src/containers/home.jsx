import React from "react";
import NewScrum from "./master/newscrum";
import JoinScrum from "../components/joinscrum";
import { connect } from "react-redux";
import { join, new_session } from "../actions";

const Home = ({ socket, onJoinSession }) => {
  function joinSession(name, session) {
    const id = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)  ;
    socket.emit("JOIN", {
      id,
      name,
      session
    });
    onJoinSession(id, name, session);
  }
  return (
    <div className="container">
      <div className="section">
        <JoinScrum handleJoin={joinSession} socket={socket} />
      </div>
      <h4 className="center-align"> - or -</h4>
      <div className="section">
        <NewScrum socket={socket} />
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
