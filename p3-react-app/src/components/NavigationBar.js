import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="nav--ls">
      <div className="nav__logo">
        <Link>MONitime App</Link>
      </div>
      <div className="nav__links">
        <NavLink className="nav__link">Home</NavLink>
        <NavLink className="nav__link">Summary</NavLink>
        <NavLink className="nav__link">Charts</NavLink>
        <NavLink className="nav__link">Add</NavLink>
        <NavLink className="nav__link">Blog</NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;
