import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions";

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(actions.currentUser());
    this.state = { isAuth: false };
  }
  Menu(profile) {
    if (profile) {
      return (
        <a className="dropdown-button" href="#!" data-activates="user-menu">
          <span>
            {profile.name.givenName + " " + profile.name.familyName}
          </span>
          <i className="material-icons right">arrow_drop_down</i>
        </a>
      );
    } else {
      return (
        <span>
          <a href="/api/login">Login</a>
        </span>
      );
    }
  }
  componentWillMount() {
    const { profile } = this.props;
    this.setState({ isAuth: profile != null });
  }
  componentDidUpdate() {
    const { session, history, dispatch } = this.props;
    const { path } = session;
    if (path) {
      // time to logout
      this.setState({ isAuth: false });
      dispatch(actions.logout()); // clear the path
      history.replace({ pathName: path });
    }
  }
  render() {
    const { profile, dispatch } = this.props;

    return (
      <div>
        <ul id="user-menu" className="dropdown-content">
          <li>
            <a onClick={() => dispatch(actions.reset())}>Logout</a>
          </li>
        </ul>
        <nav>
          <div className="nav-wrapper blue-grey darken-3">
            <a href="#!" className="left" style={{ paddingLeft: 20 }}>
              SCRUM BALLOTS
            </a>
            <ul className="right">
              <li>
                {this.Menu(profile)}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, session }) => {
  return { profile, session };
};
export default withRouter(connect(mapStateToProps)(UserMenu));
