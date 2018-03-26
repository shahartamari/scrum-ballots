import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions";
import UserImage from "../components/userImage";

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
    props.dispatch(actions.currentUser());
  }

  Menu() {
    const { profile, dispatch } = this.props;
    if (profile !== null) {
      return (
        <div>
         <ul id="user-menu" className="dropdown-content">
          <li>
            <a onClick={() => dispatch(actions.logout())}>Logout</a>
          </li>
        </ul>
          <a
            className="dropdown-button valign-wrapper"
            data-activates="user-menu"
          >
            <UserImage
              src={`/api/userPhoto/${profile.upn}`}
              alt={"user"}
              height={32}
              width={32}
              className={"circle left"}
            />
            <div style={{ marginLeft: 10 }}>
              {profile.name.givenName}
              <span className="hide-on-small-only">
                {" " + profile.name.familyName}
              </span>
              <i className="material-icons right">arrow_drop_down</i>
            </div>
          </a>
        </div>
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
    if (profile !== nextProps.profile) {
      this.setState({
        id: nextProps.profile !== null ? nextProps.profile.sub : null
      });
    }
  }
componentDidUpdate(){
  const { profile } = this.props;    
  console.log(profile? profile.sub: 'not logged in');

}
  render() {
    return (
      <div>  
        <nav>
          <div className="nav-wrapper blue-grey darken-3">
            <a href="/" className="left" style={{ paddingLeft: 20 }}>
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
