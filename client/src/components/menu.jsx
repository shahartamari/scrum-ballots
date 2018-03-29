import React, {Component} from "react";
import UserImage from "./userImage";


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    
  }  
  render() {
    const { profile } = this.props;
    
    if (profile) {
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
            <a href="#!" onClick={this.props.onLogout} title="logout">
              <i className="material-icons right medium">exit_to_app</i>
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <span>
          <a href="/login" onClick={()=> {this.setState({loading: true})}}>Login</a>
        </span>
      );
    }
  }
}
