import React from "react";

const Voted = ({ userVote }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s4">
          <div className="card center-align">
            <div className="card-title">Thank you {userVote.name} for voting</div>
            <div className="card-action valign-wrapper" style={{ height: 200 }}>
              <div className="col s12">
                <div
                  className="btn-floating btn-large flat pulse green"
                  style={{ fontSize: 32 }}
                >
                  {userVote.vote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voted;
