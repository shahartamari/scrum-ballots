import React, { Component } from "react";
import {withRouter} from 'react-router';
import Vote from "../containers/user/vote";
import Voted from "./voted";

class UserVoting extends Component {
  constructor(props) {
    super(props);
    this.state = { ballot: null };
    this.handleVote = this.handleVote.bind(this);
  }
  componentWillMount() {
    const {socket} = this.props;
    socket.on("STOP_VOTE", () => {
      this.props.history.replace('/scrum');
    })
  }
  handleVote(ballot) {
    this.setState({ ballot });
  }
  render() {
    return this.state.ballot
      ? <Voted userVote={this.state.ballot} />
      : <Vote socket={this.props.socket} broadcastVote={this.handleVote} />;
  }
}

export default withRouter(UserVoting);