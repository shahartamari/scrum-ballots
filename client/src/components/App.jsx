import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "../containers/user/welcome";
import Master from "../containers/master/master";
import Home from "../containers/home";
import VoteCount from "../containers/master/voteCount";
import NewScrum from '../containers/master/newscrum';
import {UserLayout, MasterLayout} from './layout';
import UserVoting from "./UserVoting";
import io from "socket.io-client";

const socket = io(process.env.NODE_ENV === 'production' ? null : 'http://localhost:5000');
class App extends React.Component {  
 
  render() {   
    return (
      <Switch>
         <Route exact path='/' render={(routeProps)=><MasterLayout><Home {...routeProps} socket={socket}/></MasterLayout>} />
         <Route path="/start" render={(routeProps)=><MasterLayout><NewScrum {...routeProps} socket={socket} /></MasterLayout>} />
         <Route path="/master" render={(routeProps)=><MasterLayout><Master {...routeProps} socket={socket}/></MasterLayout>} />
         <Route path="/votecount"  render={(routeProps)=><MasterLayout><VoteCount {...routeProps} socket={socket}/></MasterLayout>} />
        
        <Route path="/scrum" render={(routeProps)=><UserLayout><Welcome {...routeProps} socket={socket}/></UserLayout>} />
        <Route path="/vote" render={(routeProps)=><UserLayout><UserVoting {...routeProps} socket={socket}/></UserLayout>}  />
      </Switch>
    );
  }
}

export default App;
