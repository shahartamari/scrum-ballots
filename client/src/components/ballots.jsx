import React from "react";

const BallotList = votes => {
  return votes.map(ballot => {
    return (
      <div className="chip z-depth-3" key={ballot.id} style={{ margin: 20 }}>
        <div style={{ fontSize: 14 }}>
         
          {ballot.name}
          <span
            className="circle blue-grey white-text"
            style={{
              paddingLeft: 8,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
              marginLeft: 5
            }}
          >
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
