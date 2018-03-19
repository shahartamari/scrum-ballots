import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class JoinScrum extends Component {
  constructor(props) {
    super(props);
    const { history, socket, profile } = this.props;
    const self = this;
    this.state = {
      user:
        profile && profile.name
          ? `${profile.name.givenName} ${profile.name.familyName}`
          : '',
      session: "",
      errorMessage: ""
    };

    socket.on("WELCOME", () => {
      history.push("/scrum");
    });
    socket.on("JOIN_FAILED", function(data) {
      self.setState({ errorMessage: data.description });
    });
  }
  componentDidUpdate() {
    const { profile } = this.props;
    const displayName =
      profile && profile.name
        ? `${profile.name.givenName} ${profile.name.familyName}`
        : '';
    if (displayName !== this.state.user) {
      this.setState({ user: displayName });
    }
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
              id="sessionNumber"
              value={this.state.session}
              className="validate"
              onChange={e => {
                this.setState({ session: e.target.value });
              }}
              required
            />
            <label htmlFor="sessionNumber">Session number to join</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              id="nickname"
              value={this.state.user}
              className="validate"
              onChange={e => {
                this.setState({ user: e.target.value });
              }}
              required
            />
            <label htmlFor="nickname">Nickname</label>
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
