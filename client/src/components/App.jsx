import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "../containers/user/welcome";
import Master from "../containers/master/master";
import Home from "../containers/home";
import VoteCount from "../containers/master/voteCount";
import UserVoting from "./UserVoting";
import io from "socket.io-client";

const socket = io();

class App extends React.Component {
  
  render() {
   
    return (
      <Switch>
        <Route exact path="/" render={(routeProps)=><Home {...routeProps} socket={socket}/>} />
        <Route path="/scrum" render={(routeProps)=><Welcome {...routeProps} socket={socket}/>} />
        <Route path="/master" render={(routeProps)=><Master {...routeProps} socket={socket}/>} />
        <Route path="/votecount"  render={(routeProps)=><VoteCount {...routeProps} socket={socket}/>} />
        <Route path="/vote" render={(routeProps)=><UserVoting {...routeProps} socket={socket}/>}  />
      </Switch>
    );
  }
}

export default App;
