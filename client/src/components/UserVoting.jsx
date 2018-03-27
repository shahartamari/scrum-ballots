//-----------------------------------------------------------------------------------------------------
// the User Voting loads either the Vote or Voted component
// depends on a signal sent by the scrum master and transmitted by Socket IO
//-----------------------------------------------------------------------------------------------------

import React, { Component } from "react";
import {withRouter} from 'react-router';
import Vote from "../containers/user/vote";
import Voted from "./voted";

class UserVoting extends Component {
  constructor(props) {
    super(props);
    this.state = { ballot: null, data: {}};
    this.handleVote = this.handleVote.bind(this);
  }
  componentWillMount() {
    const {socket} = this.props;
    socket.on("STOP_VOTE", () => {
      this.props.history.replace('/scrum');
    });
    socket.on("HANDLE_TALLY", ({data, unitHeight}) => {
      this.setState({data , unitHeight});
    });
  }
  componentWillUnmount() {
    const {socket} = this.props;
    socket.off("STOP_VOTE");
    socket.off("HANDLE_TALLY");
  }
  handleVote(ballot) {
    this.setState({ ballot });
  }
  render() {

    return this.state.ballot
      ? <Voted socket={this.props.socket} userVote={this.state.ballot} data={this.state.data} unitHeight={this.state.unitHeight} />
      : <Vote socket={this.props.socket} broadcastVote={this.handleVote} />;
  }
}

export default withRouter(UserVoting);