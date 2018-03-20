import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { newSession } from "../../actions";

class NewScrum extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", secret: false };
  }
  componentWillMount() {
    const { profile, history, socket } = this.props;
    if (!profile) {
      history.replace("/");
    }
    const self = this;
    socket.on("NEW_SESSION", data => {
      this.props.dispatch(
        newSession(data.session, self.state.name, self.state.secret)
      ); // update the store
      history.push("/master");
    });
  }
  componentWillUnmount() {
    const { socket } = this.props;
    socket.off("NEW_SESSION");
  }
  createSession() {
    this.props.socket.emit("CREATE"); // send message to server to start session
  }
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-content">
            <p className="section">
              Start a new SCRUM session as a SCRUM master. Team members are then
              able to join your session and vote on Sprint items.
            </p>

            <div className="input-field ">
              <input
                id="session-name"
                className="validate"
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                required
              />
              <label htmlFor="session-name">Session Title</label>
            </div>

            <div className="switch">
              <label className="flow-text">
                Open Ballots
                <input
                  type="checkbox"
                  value={this.state.secret}
                  onChange={e => this.setState({ secret: e.target.checked })}
                />
                <span className="lever" />
                Secret Ballots
              </label>
            </div>
            <br />
          </div>
          <div className="card-action center-align">
            <a
              className="btn wave-effect red"
              onClick={this.createSession.bind(this)}
              disabled={this.state.name === ""}
            >
              New Scrum Session
            </a>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToPros = ({ profile }) => {
  return { profile };
};
export default withRouter(connect(mapStateToPros)(NewScrum));
