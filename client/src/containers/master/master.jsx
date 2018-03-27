import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../actions";

class Master extends Component {
  componentWillMount() {
    const { session, history, profile } = this.props;
    // check if we are connected to a session
    // this prevents the user from coming here by typing the URL
    if (!session && !session.id) {
      history.replace("/start");
    }
    // disallow if not logged in
    if (!profile) {
      history.replace("/");
    }
  }
  componentDidMount() {
    const { socket, onJoin, onReset, session } = this.props;
    // a user requested to join the session
    // add the user to store after sending them a welcome message
    socket.on("HANDLE_JOIN", data => {
      socket.emit("WELCOME", { id: data.id, session });
      onJoin(data.id, data.name); // send welcome message

    });
    // this is returend from each user that is still alive
    socket.on("PONG", data => {   
      onJoin(data.id, data.name);  // add the connected user to the store      
    })

    socket.emit("STOP_VOTE", session.id); // ask all screens to turn back to welcome screen
    onReset(); // clear store from old votes and from all current users
    
    // all connected users should reply to the PING message to be added back
    socket.emit("PING", session.id); // start a ping session 

  }
  componentWillUnmount() {
    // make sure to stop listening to avoid multiple event firings
    const { socket } = this.props;
    socket.off("HANDLE_JOIN"); 
    socket.off("PONG");
  }
  startVoting() {
    const { socket, session } = this.props;
    socket.emit("START_VOTE", session.id); // turn all connected users to VOTE screen
  }
  endSession() {
    const { socket, session, history, onEnd } = this.props;
    socket.emit("END", session.id); // end current session and log off
    onEnd();
    history.push("/");
  }
  render() {
    const { users, session } = this.props;
    const userList = users.map(user => {
      return (
        <div className="chip z-depth-3" key={user.id} style={{ margin: 20 }}>
          <span style={{ fontSize: 18 }}>
            {user.name}
          </span>
        </div>
      );
    });

    return (
      <div className="grey lighten-3">
        <h1 className="center-align" style={{ marginTop: 0, paddingTop: 23.5 }}>
          {session.id}
        </h1>
        <h3 className="center-align">
          {session.name}
        </h3>
        <div className="card ">
          <div className="card-content blue-grey darken-2">
            {userList}
          </div>
          <div className="card-action center-align">
            <Link
              to="/votecount"
              className="btn-flat indigo-text darken-4"
              onClick={this.startVoting.bind(this)}
            >
              <i className="material-icons right">play_arrow</i> START VOTING
            </Link>
            <a
              className="btn-floating left large blue-grey lighten-3"
              title="End Session"
              onClick={this.endSession.bind(this)}
            >
              <i className="material-icons">close</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, session, profile }) => {
  return { users, session, profile };
};

const mapDispatchToProps = dispatch => {
  return {
    onJoin: (id, name) => {
      dispatch(actions.join(id, name));
    },
    onReset: () => { 
      dispatch(actions.clearUsers());
      dispatch(actions.resetVote());
    },
    onEnd: () => {
      dispatch(actions.reset());
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
