import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { new_session} from "../../actions";

class NewScrum extends Component {
  constructor(props) {
    super(props);
    const { history, socket, profile } = this.props;
    const self = this;
    this.state = { name: "", secrect: false };

    socket.on("NEW_SESSION", data => {
      this.props.new_session(data.session, self.state.name, self.state.secret); // update the store
      history.push("/master");
    });
    if (!profile) {
      history.replace('/');
    }
  }
  
  createSession() {
    this.props.socket.emit("CREATE");
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
const mapDispatchToProps = dispatch => {
  return {
    new_session: (session, name, secret) => new_session(session, name, secret)
  }
}

export default withRouter(connect(({profile}) => {return {profile}}, mapDispatchToProps)(NewScrum));
