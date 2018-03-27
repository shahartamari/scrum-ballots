//-----------------------------------------------------------------------------------------------------
// wrappers for screens. Maintain a consistent look for all screens in the application
//-----------------------------------------------------------------------------------------------------

import React from "react";
import Navbar from "../containers/Navbar";
import { Link } from "react-router-dom";

export const MasterLayout = ({ children, ...rest }) => {
  return (
    <div className="container row">
      <div className="col m12 l10">
        <Navbar />

        <div className="my-deep-orange-fade banner">
          <img
            className="responsive-img banner-img"
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
        <div style={{ position: "relative" }}>
          <Link
            to="/leave"
            className="btn-floating btn-medium escape-banner right"
            title="leave session"
          >
            <i className="material-icons">exit_to_app</i>
          </Link>
        </div>
        {children}
      </div>

      <div className="Footer" />
    </div>
  );
};
