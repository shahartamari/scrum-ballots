//-----------------------------------------------------------------------------------------------------
// The Home screen allows user to either join a session or start their own session
// if the user was disconnected from a previous session, then a link allows them
// to return back into the session
//-----------------------------------------------------------------------------------------------------

import React from "react";
import JoinScrum from "../components/joinscrum";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

const Home = ({ socket, onJoin, onNewSession, profile, session, user }) => {
  function joinSession(id, name, session) {
    socket.emit("JOIN", {
      id,
      name,
      session
    });
    onJoin(id, name);
  }
  function onWelcome(session) {
    onNewSession(session);
  }
  const disabled = profile ? "" : "disabled";
  console.log(user);
  return (
    <div>
      <JoinScrum
        handleJoin={joinSession}
        handleWelcome={onWelcome}
        socket={socket}
        profile={profile}
      />
      <div className="section">
        <div className="hide-on-small-only">
          <Link to="/start" className={"left btn-flat " + disabled}>
            I want to start a new session
          </Link>
        </div>

        <Link
          to="/scrum"
          onClick={() =>{
            console.log(user);
            joinSession(
              user.id,
              user.name,
              session.id
            )}
          }
          className={session.id && user ? "right" : "hide"}
        >
          <span className="left">Resume Session</span>{" "}
          <i className="material-icons">restore</i>
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = ({ profile, session, users }) => {
  return { profile, session, user: users.length > 0 ? users[0] : null };
};
const mapDispatchToProps = dispatch => {
  return {
    onJoin: (id, name) => {
      dispatch(actions.clearUsers()); // clear old users
      dispatch(actions.join(id, name));
    },
    onNewSession: session => {
      dispatch(actions.newSession(session.id, session.name, session.secret));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
