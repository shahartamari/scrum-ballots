import React from "react";
import BarChart from './barChart';

const Voted = ({ socket, userVote,data, unitHeight }) => {

  return (  

      <div className="card center-align">
        <div className="card-title">
          <h2>
            {userVote.name}
          </h2>
        </div>
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
        <BarChart
            width={500}
            unitHeight={unitHeight}
            data = {data}
            socket = {socket}
            labels = {[0, 1, 3, 5, 8, 13, 21]}
          />
      </div>
      

  );
};

export default Voted;
