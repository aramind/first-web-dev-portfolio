import React from "react";
import { Link, NavLink } from "react-router-dom";

const TitlePage = () => {
  return (
    <div className="page page--title">
      <h1 className="title">MONitime</h1>
      <p className="title-subtext">
        <i>Track your time and optimize your life!</i>
      </p>
      <Link to="/monitimeapp">
        <button className="btn btn--main-action">START</button>
      </Link>
      <small>
        Powered by Gcash Donations. <NavLink>Donate Now.</NavLink>
      </small>
    </div>
  );
};

export default TitlePage;
