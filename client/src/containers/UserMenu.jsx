import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions";
import UserImage from "../components/userImage";

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(actions.currentUser());
    this.state = { isAuth: false };
  }

  Menu() {
    const { profile } = this.props;
    if (this.state.isAuth) {
      return (
        <a className="dropdown-button" href="#!" data-activates="user-menu">
          <div className="valign-wrapper">
            <UserImage
              src={`/api/userPhoto/${profile.upn}`}
              alt={"user"}
              height={32}
              width={32}
              className={"circle"}
            />
            <div className="col m10">
              <span>
                {profile.name.givenName + " " + profile.name.familyName}
              </span>
              <i className="material-icons right">arrow_drop_down</i>
            </div>
          </div>
        </a>
      );
    } else {
      return (
        <span>
          <a href="/login">Login</a>
        </span>
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
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
    const { dispatch } = this.props;

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
                {this.Menu()}
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
