//-----------------------------------------------------------------------------------------------------
// shows a menu of options for the user
// including user name and photo
// the user menu include the ability to logout, but is where we can add more options
//-----------------------------------------------------------------------------------------------------
import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Menu from "../components/menu";

const Navbar = ({ logout, profile, currentUser }) => {
  currentUser(); // current user action is passed through the state2props function
  
  return (
    <div>
      <nav>
        <div className="nav-wrapper blue-grey darken-3">
          <a href="/" className="left">
            SCRUM BALLOTS
          </a>
          <div className="right">
            <Menu onLogout={logout} profile={profile} />
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ profile }) => {
  return { profile };
};
export default connect(mapStateToProps, actions)(Navbar);
