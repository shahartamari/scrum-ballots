//-----------------------------------------------------------------------------------------------------
// The Vote count screen shows the ballot comonent as user vote on a question
// and a vote tally chart with user votes
//-----------------------------------------------------------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Ballots from "../../components/ballots";
import { vote } from "../../actions";
import BarChart from "../../components/barChart";

class VoteCount extends Component {
  componentDidMount() {
    const { dispatch, socket } = this.props;
    socket.on("HANDLE_VOTE", data => {
      dispatch(vote(data)); // update the store with cast vote
    });
    
  }
  componentWillUnmount() {
    const {socket} = this.props;
    socket.off("HANDLE_VOTE"); // turn off event listener to pervent mounting multiple listeners
  }
  render() {
    const { votes, users, session, socket } = this.props;
    const labels = [0, 1, 3, 5, 8, 13, 21];
    const data = votes
      ? labels.map(e => {
          return votes.filter(v => {
            return v.voteCast.vote === e;
          }).length;
        })
      : new Array(8).join("0").split("").map(parseFloat);  
      socket.emit("TALLY", {data, unitHeight: users.length, room: session.id});
    return (
      <div>
        <div className="card center-align">
          <div className="card-title"><span>
              {votes.length} of {users.length} team members voted
            </span></div>
          <div className="card-content" ref="parent" />
         
          {session.hiddenBallots ? <span /> : <Ballots votes={votes} /> /* hide if user chose secret ballots*/} 
          <BarChart
            width={500}
            unitHeight= {users.length}
            socket={socket}
            labels={labels}
            data={data}
          />
          <div className="card-action">
            <Link to="/master" className="btn-flat indigo-text darken-4">
              <i className="material-icons right">play_arrow</i> END VOTING
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ votes, users, session }) => {
  return { votes, users, session };
};

export default withRouter(connect(mapStateToProps)(VoteCount));
