import React from "react";
import UserMenu from "../containers/UserMenu";

export const MasterLayout = ({ children, ...rest }) => {
  return (
    <div className="container row ">
      <div className="col m12 l10 push-l1">
        <UserMenu />
        <div className="valign-wrapper">
          <img
            className="materialboxed"
            alt="banner"
            src="image/scrummy.png"
          />
        
          <div className="banner my-deep-orange-fade" />
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
