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
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey white-text">
              <span className="card-title">
                Welcome {user ? user.name : `<unknown>`}
              </span>
              <div className="card-content">
                <p>
                  You are participating is scrum session{" "}
                  {session ? session.id : ""}. When the Scrum master starts a
                  voting round you will be redirected to the voting screen where
                  you can enter your vote.
                </p>
              </div>
            </div>
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
    onEnter: () => dispatch(resetVote())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Welcome)
);
