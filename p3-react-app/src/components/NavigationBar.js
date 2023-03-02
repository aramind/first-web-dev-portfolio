import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="nav--ls">
      <div className="nav__logo">
        <Link
          to="/monitimeapp"
          className="nav__link nav__link--logo"
        >
          MONitime App
        </Link>
      </div>
      <div className="nav__links">
        <NavLink
          className="nav__link"
          to="/monitimeapp"
        >
          Home
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/summary"
        >
          Summary
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/Charts"
        >
          Charts
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/Add"
        >
          Add
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/blog"
        >
          Blog
        </NavLink>
        <NavLink
          className="nav__link"
          to="/"
        >
          Log out
        </NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;
