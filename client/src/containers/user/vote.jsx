import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { vote } from "../../actions";

class Vote extends React.Component {
  componentWillMount() {
    const { votes, history } = this.props;
    if (votes.length > 0) {
      // prevent double voting
      history.push("/scrum");
    }
  }
  renderVoteButton(value, index) {
    return (
      <div className="col s4 center-align" key={index}>
        <div
          className="btn-floating btn-large waves-effect waves-light teal"
          onClick={() => this.castVote(value)}
        >
          <div style={{ fontSize: 24 }}>
            {value}
          </div>
        </div>
      </div>
    );
  }

  renderVotePanel() {
    const fib = [[0, 1, 3], [5, 8, 13], ["*", 21, "#"]];
    return fib.map((item, row) => {
      return (
        <div className="row" key={row} style={{ height: 75 }}>
          {item.map((arrItem, col) => {
            return isNaN(arrItem)
              ? <div className="col s4" key={row + 1 * col + 1} />
              : this.renderVoteButton(arrItem, row + 1 * col + 1);
          })}
        </div>
      );
    });
  }

  castVote(vote) {
    const { socket, broadcastVote, onVote, user } = this.props;
    const ballot = { ...user, vote };

    socket.emit("VOTE", ballot); // submit vote to session
    broadcastVote(ballot); // react to casted vote
    onVote(ballot); // update the user store
  }
  render() {
    return (
      <div className="card">
        <div className="card-title center-align">
          <h3>Cast Your Vote</h3>
        </div>
        <div className="card-action">
          {this.renderVotePanel()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ votes, users, session }) => {
  return { votes, user: users.length > 0 ? users[0] : null, session };
};
const mapDispatchToProps = dispatch => {
  return {
    onVote: voteCast => dispatch(vote(voteCast))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vote));
