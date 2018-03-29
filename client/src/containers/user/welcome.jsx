//-----------------------------------------------------------------------------------------------------
// Welcome component is where the user sees when they are not voting
// it provides a short message and handles life-cycle events
//-----------------------------------------------------------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { resetVote, reset } from "../../actions";

class Welcome extends Component {
  componentDidMount() {
    const { socket, history, onEnter, user, onLeave, session } = this.props;
    if (!session || !session.id) {
      history.replace("/"); // there is no connected session - escapte back to home
    }
    socket.on("START", () => {
      // show the vote screen when scrum master pushed start voting button
      history.replace("/vote");
    });
    socket.on("END_SESSION", session => {
      socket.emit("LEAVE", { user, session });
      onLeave();
      history.push("/");
    });
    socket.on("PING", () => {
      socket.emit("PONG", { room: session.id, user });
    });
    onEnter();
  }
  componentWillUnmount() {
    const { socket } = this.props;
    socket.off("START");
    socket.off("END_SESION");
    socket.off("PING");
  }

  render() {
    const { user, session } = this.props;
    return (
      <div className="container">
     
        <div className="card blue-grey white-text">
        
          <div className="card-title" >  </div>
          <div className="card-content flow-text">
            <h4>
              Welcome {user ? user.name : `<unknown>`}
            </h4>
         
            <div className="divider" />
            <p>
              You are participating in &nbsp;
              {session ? session.name : ""}. <br />When the Scrum Master starts
              a voting round you will be able to cast your vote.
            </p>
            <Link
              to="/leave"
              className="btn-floating btn-small escape-banner right"
              title="leave session"
            >
              <i className="material-icons">exit_to_app</i>
            </Link>
          </div>
          <div className="card-action">
            
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ users, session }) => {
  return { user: users.length > 0 ? users[0] : null, session };
};
const mapDispatchToProps = dispatch => {
  return {
    onEnter: () => dispatch(resetVote()),
    onLeave: () => dispatch(reset())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Welcome)
);
