import React from "react";
import UserImage from "./userImage";
import axios from "axios";
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      profile: null
    };
  }
  async getProfile() {
    try {
      const res = await axios.get("/api/getUser");
      if (res.data !== "") {
        this.setState({ profile: res.data });
      }
    } catch (e) {
      this.setState({ error: true });
    }
  }
  componentDidMount() {
    this.getProfile();
  }
  render() {
    const { profile } = this.state;
    if (profile !== null) {
      return (
        <div style={{ margin: 10, minWidth: 200 }}>
          <a
            className="btn-floating"
            title="Logout"
            onClick={this.props.onLogout}
          >
            <UserImage
              src={`/api/userPhoto/${profile.upn}`}
              alt={"user"}
              height={40}
              width={40}
              className={"circle left"}
            />
          </a>

          <div className="right">
            {profile.name.givenName}
            <span className="hide-on-small-only">
              {" " + profile.name.familyName}
            </span>
          </div>
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
}
