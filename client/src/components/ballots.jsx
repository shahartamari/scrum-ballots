//-----------------------------------------------------------------------------------------
// show a list of users and their vote count
// this list is displayed for open ballot on the VoteCount screen
//-----------------------------------------------------------------------------------------

import React from "react";

const BallotList = votes => {
  return votes.map(ballot => {
    return (
      <div className="chip z-depth-3" key={ballot.id} style={{ margin: 20 }}>
        <div style={{ fontSize: 14 }}>
          {ballot.name}
          <span className="circle blue-grey white-text vote-count">
            {ballot.vote}
          </span>
        </div>
      </div>
    );
  });
};
const Ballots = ({ votes }) => {
  return (
    <div className="container left-align">
      {BallotList(
        votes.map(e => {
          return e.voteCast;
        })
      )}
    </div>
  );
};

export default Ballots;
