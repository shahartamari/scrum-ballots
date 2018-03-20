import React from "react";
import JoinScrum from "../components/joinscrum";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { join, newSession } from "../actions";

const Home = ({ socket, onJoinSession, profile, session }) => {

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
  const disabled = profile ? '' : 'disabled';

  return (
    <div>
      <JoinScrum handleJoin={joinSession} socket={socket} profile={profile} />
      <div className="hide-on-small-only">
        <div className="section">
          <Link to="/start" className={'btn-flat ' + disabled}>I want to start a new session</Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({profile, session}) => {
  return {profile, session};
}
const mapDispatchToProps = dispatch => {
  return {
    onJoinSession: (id, name, session) => {
      dispatch(newSession(session, null));
      dispatch(join(id, name));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
