import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Ballots from "../../components/ballots";
import { vote } from "../../actions";
import BarChart from "../../components/barChart";

class VoteCount extends Component {
  componentWillMount() {
    const { dispatch, socket } = this.props;
    socket.on("HANDLE_VOTE", data => {
      dispatch(vote(data)); // update the store with cast vote
    });
  }
  getChartData(votes) {
    const labels = [0, 1, 3, 5, 8, 13, 21];
    return {
      labels: vote,
      datasets: [
        {
          label: "# of votes",
          data: votes
            ? labels.map(elem => {
                return labels.filter(user => {
                  return user.voteCast.vote === elem;
                }).length;
              })
            : new Array(8).join("0").split("").map(parseFloat)
        }
      ]
    };
  }
  getBarChartData(votes) {
    const labels = [0, 1, 3, 5, 8, 13, 21];
    const baseWidth = window.innerWidth > 1024 ? window.innerWidth / 25 : window.innerWidth / 12;
    console.log(window.innerWidth);
    console.log(baseWidth);
    return {
      config: {
        barWidth: baseWidth,
        margin: baseWidth * .6,
        colors: [
          "#37474f",
          "#ab47bc",
          "#ffc400",
          "#2196f3",
          "#795548",
          "#ff6e40",
          "#00e676"
        ]
      },
      labels,
      data: votes
        ? labels.map(e => {
            return votes.filter(v => {
              return v.voteCast.vote === e;
            }).length;
          })
        : new Array(8).join("0").split("").map(parseFloat)
    };
  }
  render() {
    const { votes, users, session } = this.props;
    const { data, config, labels } = this.getBarChartData(votes);
    config.width =
      labels.length * (config.barWidth + config.margin) + config.margin; // enough space for margins
    config.height = (1 + users.length) * config.barWidth * 1.4; // allow enough height so that max value is at 80% height

    return (
      <div>
        <div className="card center-align">
          <div className="card-title h1 ">Vote Count</div>
          <div className="card-content" />
          <p>
            <span>
              {votes.length} of {users.length} team members voted
            </span>
          </p>
          {session.hiddenBallots ? <span /> : <Ballots votes={votes} />}
          <BarChart config={config} data={data} labels={labels} />
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
