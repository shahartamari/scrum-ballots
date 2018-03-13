import React from "react";

export const MasterLayout = ({ children, ...rest }) => {
  return (
    <div className="container row">
      <div className="col m12 l10 push-l1">
        <div className=" valign-wrapper">
          <img
            className="responsive-img"
            alt="banner"
            src="image/scrum banner.png"
          />
          <div className="background-grad" />
        </div>
        {children}
      </div>

      <div className="Footer" />
    </div>
  );
};

export const UserLayout = ({ children, ...rest }) => {
  return (
    <div className="row">
      <div className="col s12 m6 l4 push-l4">
        {children}
      </div>

      <div className="Footer" />
    </div>
  );
};
