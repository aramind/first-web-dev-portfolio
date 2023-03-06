import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationBar.css";
import "./NavBarForMobile.css";

const NavBarForMobile = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="nav--ss">
      <div className="nav__logo--ss">
        <Link
          to="/monitimeapp"
          className="nav__link nav__link--logo"
        >
          MONitime App
        </Link>
      </div>
      <div className={`nav__links ${showMenu ? "show" : ""}`}>
        <NavLink
          className="nav__link"
          to="/monitimeapp"
        >
          Home
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/Add"
        >
          Add
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/Charts"
        >
          Charts
        </NavLink>
        <NavLink
          className="nav__link"
          to="/monitimeapp/summary"
        >
          Summary
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
      <div
        className={`nav__menu ${showMenu ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="nav__icon">
          <span className="nav__icon-bar"></span>
          <span className="nav__icon-bar"></span>
          <span className="nav__icon-bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBarForMobile;
