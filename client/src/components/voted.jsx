import React from "react";
import BarChart from './barChart';

const Voted = ({ socket, userVote,data, unitHeight }) => {

  return (  

      <div className="card center-align">
        <div className="card-title blue-grey darken-3 white-text">
          <h2>
            {userVote.name}
          </h2>
        </div>
        <div className="card-action grey lighten-3">
          <div className="banner-title">
            <div
              className="btn-floating btn-large flat pulse green"
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
