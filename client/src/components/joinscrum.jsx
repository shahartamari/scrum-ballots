//-----------------------------------------------------------------------------------------------------
// this component allows a user to join a scrum session
// the user needs to know the scrum session number.
// the user can choose a nickname, or log in and join as his own full display name
//-----------------------------------------------------------------------------------------------------
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class JoinScrum extends Component {
  constructor(props) {
    super(props);
    const { history, socket } = this.props;
    const self = this;
    this.state = {
      id:  Math.random().toString(36).substring(2) + new Date().getTime().toString(36),
      user: "",
      session: "",
      errorMessage: ""
    };
    // when we get a welcom message we add the user to the store and move on to Welcome screen
    socket.on("WELCOME", (id, session) => {
      if (id === this.state.id) {
    
        this.props.handleWelcome(session);
        history.push("/scrum");
      }
    });
    // if we failed to join, we show an error message
    socket.on("JOIN_FAILED", function(data) {
      self.setState({ errorMessage: data.description });
    });
  }
  componentDidUpdate() {
    const { profile } = this.props;

    if (profile && profile.name) {
      const displayName = `${profile.name.givenName} ${profile.name.familyName}`;
      if (displayName !== this.state.user) {
        this.setState({ user: displayName }); // fix the state to display name for logged on user
        // if they try and change it, the update process will set it back and ignore their typing
      }
    }
  }

  onJoinClick() {
    this.setState({errorMessage: ""});
    const {id, user, session} = this.state;
    this.props.handleJoin(id, user, session); // push join user action
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
            <label className="active" htmlFor="nickname">
              Nickname
            </label>
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
