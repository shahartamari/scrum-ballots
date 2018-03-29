//-----------------------------------------------------------------------------------------------------
// shows a menu of options for the user
// including user name and photo
// the user menu include the ability to logout, but is where we can add more options
//-----------------------------------------------------------------------------------------------------
import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Menu from "../components/menu";
import { withRouter } from "react-router";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, profile: null };
    this.props.currentUser(); // current user action is passed through the state2props function
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { history, profile } = this.props;
    if (profile) {
      this.setState({ profile });
    } else {
      this.setState({ loading: true });
      history.push("/login");
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { profile } = nextProps;
    this.setState({ loading: profile === null, profile });
  }
  render() {
    const { logout } = this.props;
    const { profile } = this.state;
    console.log("render: ");
    console.log(profile);
    return (
      <div>
        <nav>
          <div className="nav-wrapper blue-grey darken-3">
            <a href="/" className="left">
              SCRUM BALLOTS
            </a>
            <div className="right">
              <Menu
                onLogout={logout}
                profile={profile}
                onLogin={this.handleLogin}
              />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  return { profile };
};
export default withRouter(connect(mapStateToProps, actions)(Navbar));
