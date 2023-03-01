import React from "react";
import { Link, NavLink } from "react-router-dom";

const TitlePage = () => {
  return (
    <div className="page page--title">
      <div id="app-title">
        <h1>MONitime</h1>
      </div>
      <p id="title-subtext">
        <i>Track your time and optimize your life!</i>
      </p>
      <div className="btn-start-cont">
        <Link to="/monitimeapp">
          <button className="btn btn--start">START</button>
        </Link>
        <p className="small">
          Powered by Gcash Donations. <NavLink id="donate">Donate Now.</NavLink>
        </p>
      </div>
    </div>
  );
};

export default TitlePage;
