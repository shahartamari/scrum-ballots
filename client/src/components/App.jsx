//-----------------------------------------------------------------------------
// the App module provide the routes in the React application
// we wrap each component with a layout to provide a common frame
// we use different, more light-weight frame for use screens
//-----------------------------------------------------------------------------

import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "../containers/user/welcome";
import Master from "../containers/master/master";
import Home from "../containers/home";
import VoteCount from "../containers/master/voteCount";
import NewScrum from '../containers/master/newscrum';
import Leave from '../containers/user/leave';
import {UserLayout, MasterLayout} from './layout';
import UserVoting from "./UserVoting";
import io from "socket.io-client";

// in production our socket is using a single server
// in our development environment, the server is running on port 5000, the client on 3000
const socket = io(process.env.NODE_ENV === 'production' ?  window.location.origin : 'http://localhost:5000');
const App = () => {  
  return (
    <Switch>
        <Route exact path='/' render={(routeProps)=><MasterLayout><Home {...routeProps} socket={socket}/></MasterLayout>} />
        <Route path="/start" render={(routeProps)=><MasterLayout><NewScrum {...routeProps} socket={socket} /></MasterLayout>} />
        <Route path="/master" render={(routeProps)=><MasterLayout><Master {...routeProps} socket={socket}/></MasterLayout>} />
        <Route path="/votecount"  render={(routeProps)=><MasterLayout><VoteCount {...routeProps} socket={socket}/></MasterLayout>} />
      
      <Route path="/scrum" render={(routeProps)=><UserLayout><Welcome {...routeProps} socket={socket}/></UserLayout>} />
      <Route path="/vote" render={(routeProps)=><UserLayout><UserVoting {...routeProps} socket={socket}/></UserLayout>}  />
      <Route path="/leave" render={(routeProps)=><Leave {...routeProps} socket={socket}/>}  />
    </Switch>
  );
 
}

export default App;
