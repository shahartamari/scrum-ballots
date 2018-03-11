import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { join, resetVote } from "../../actions";

class Master extends Component {
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
  render() {
    const { users, session } = this.props;
    const userList = users.map(user => {
      return (
        <div className="chip z-depth-3" key={user.id} style={{margin: 20}}>
          <span style={{ fontSize: 18 }}>
            {user.name}
          </span>
        </div>
      );
    });

    return (
      <div className="container">
        <h3 className="center-align">
          {session.id}
        </h3>
        <h1 className="center-align">
          {session.name}
        </h1>
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
      dispatch(join(id, name));
    },
    onReset: () => {
      dispatch(resetVote())
    }

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Master);
