//-----------------------------------------------------------------------------------------------------
// shows a menu of options for the user
// including user name and photo
// the user menu include the ability to logout, but is where we can add more options
//-----------------------------------------------------------------------------------------------------
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions";
import Menu from "../components/menu";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
    props.dispatch(actions.currentUser());
  }
  
  handleLogout() {
    const { dispatch } = this.props;
    dispatch(actions.logout())
    this.forceUpdate();
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
                <Menu onLogout={this.handleLogout.bind(this)} />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default withRouter(connect(mapStateToProps)(Navbar));
