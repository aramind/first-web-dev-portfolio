import { Link } from "@mui/material";
import React from "react";

const NavBarLink = ({ name }) => {
  return (
    <Link
      color="inherit"
      underline="none"
      href="/"
    >
      {name}
    </Link>
  );
};

export default NavBarLink;
