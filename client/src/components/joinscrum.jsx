import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class JoinScrum extends Component {
  constructor(props) {
    super(props);
    const { history, socket } = this.props;
    const self = this;
    this.state = { user: "", session: "", errorMessage: "" };

    socket.on("WELCOME", () => {
      history.push("/scrum");
    });
    socket.on("JOIN_FAILED", function(data) {
      self.setState({ errorMessage: data.description });
    });
  }
  onJoinClick() {
    this.props.handleJoin(this.state.user, this.state.session); // push join user action
  }
  render() {
    return (
      <div className="card">
        <div className="card-content">
          Join a SCRUM session and cast your vote on Sprint items.
          <div className="input-field">
            <input
              type="text"
              value={this.state.session}
              className="validate"
              placeholder="type a session number"
              onChange={e => {
                this.setState({ session: e.target.value });
              }}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              value={this.state.user}
              className="validate"
              onChange={e => {
                this.setState({ user: e.target.value });
              }}
              placeholder="please enter your name"
              required
            />
          </div>
        </div>
        <div className="card-action center-align">
          <a
            className="btn wave-effect activator"
            onClick={this.onJoinClick.bind(this)}
            disabled={this.state.user === "" || this.state.session === ""}
          >
            Join Scrum Session
          </a>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            Join SCRUM Session<i className="material-icons right">close</i>
          </span>
          <p>
            {this.state.errorMessage}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(JoinScrum);
