import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../actions";

class Master extends Component {
  componentWillMount() {
    const {session, history} = this.props;
    // check if we are connected to a session
    // this prevents the user from coming here by typing the URL
    if (!session || !session.id) {
      history.replace('/start');
    }
  }
  componentDidMount() {
    const { socket, onJoin, onReset } = this.props;
    socket.on("HANDLE_JOIN", data => {
      onJoin(data.id, data.name);
    });
    socket.emit("STOP_VOTE");
    onReset();
  }
  startVoting() {
    const { socket } = this.props;
    socket.emit("START_VOTE");
  }
  endSession() {
    const { socket, session, history, onEnd } = this.props;
    socket.emit("END", session.id);
    onEnd();
    history.push("/start");
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
      <div>
        <h1 className="center-align">
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

const mapStateToProps = ({ users, session }) => {
  return { users, session };
};

const mapDispatchToProps = dispatch => {
  return {
    onJoin: (id, name) => {
      dispatch(actions.join(id, name));
    },
    onReset: () => {
      dispatch(actions.resetVote());
    }, 
    onEnd: () => {
      dispatch(actions.reset());
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
