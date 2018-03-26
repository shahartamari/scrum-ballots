import React from "react";
import JoinScrum from "../components/joinscrum";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { join, newSession } from "../actions";

const Home = ({ socket, onJoin, onNewSession, profile, session }) => {

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
  const disabled = profile ? '' : 'disabled';

  return (
    <div>
      <JoinScrum handleJoin={joinSession} handleWelcome={onWelcome} socket={socket} profile={profile} />
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
    onJoin: (id, name)=> {dispatch(join(id, name));},    
    onNewSession: (session) => {
      dispatch(newSession(session.id, session.name, session.secret));      
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
