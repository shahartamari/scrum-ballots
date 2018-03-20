import React from "react";
import UserMenu from "../containers/UserMenu";

export const MasterLayout = ({ children, ...rest }) => {
  return (
    <div className="container row">
      <div className="col m12 l10">
        <UserMenu />
        <div className="my-deep-orange-fade banner">
          <img
            className="responsive-img"
            alt="banner"
            src="image/scrummy.png"
          />
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
