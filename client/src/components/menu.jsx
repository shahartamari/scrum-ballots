import React from "react";
import UserImage from "./userImage";

 const Menu = ({profile, onLogin, onLogout}) => {
  if (profile && profile.name) {
    return (
      <ul>
        <li>
          <UserImage
            src={`/api/userPhoto/${profile.upn}`}
            alt={"user"}
            height={40}
            width={40}
            className={"circle "}
            title={`${profile.name.givenName} ${profile.name.familyName}`}
          />
        </li>

        <li style={{ maxHeight: 64 }}>
          <a onClick={onLogout} title="logout">
            <i className="material-icons right medium">exit_to_app</i>
          </a>
        </li>
      </ul>
    );
  } else {
    return (
      <span>
        <a href="/login" onClick={onLogin}>
          Login
        </a>
      </span>
    );
  }
};
export default Menu;