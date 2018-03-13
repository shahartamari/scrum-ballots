import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetVote } from "../../actions";

class Welcome extends Component {
  componentDidMount() {
    const { socket, history, onEnter } = this.props;
    socket.on("START", () => {
      // show the vote screen when scrum master pushed start voting button
      history.replace("/vote");
    });
    onEnter();
  }
  render() {
    const { user, session } = this.props;
    return (
      <div className="card blue-grey white-text">
        <span className="card-title">
      
        </span>
        <div className="card-content flow-text">
        <h4 className=''>Welcome {user ? user.name : `<unknown>`}</h4>
        <div className='divider' />
          <p>
            You are participating is scrum session&nbsp;
            {session ? session.id : ""}. <br />When the Scrum Master starts a voting
            round you will be able to cast your vote.
          </p>
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
    onEnter: () => dispatch(resetVote())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Welcome)
);
