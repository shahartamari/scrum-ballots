import React from "react";
import { connect } from "react-redux";
import Login from "./login";
import { reset } from "../actions";

const Menu = profile => {   
  if (profile && profile.name) {
    return (
      <a className="dropdown-button" href="#!" data-activates="user-menu">
        {profile.name.givenName + " " + profile.name.familyName}
        <i className="material-icons right">arrow_drop_down</i>
      </a>
    );
  } else {
    return <Login />;
  }
};
const UserMenu = ({ profile, dispatch }) => {
  return (
    <div>
      <ul id="user-menu" className="dropdown-content">
        <li>
          <a onClick={() => dispatch(reset())}>Logout</a>
        </li>
      </ul>
      <nav>
        <div className="nav-wrapper blue-grey darken-3">
          <a href="#!" className="left" style={{ paddingLeft: 20 }}>
            SCRUM BALLOTS
          </a>
          <ul className="right">
           <li>
              {Menu(profile)}
          </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = ({ profile }) => {
  return { profile };
};
export default connect(mapStateToProps)(UserMenu);
