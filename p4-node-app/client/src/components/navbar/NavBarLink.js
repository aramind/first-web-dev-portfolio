import { Link } from "@mui/material";
import React from "react";

const NavBarLink = ({ name, to }) => {
  return (
    <Link
      color="inherit"
      underline="none"
      href={to}
    >
      {name}
    </Link>
  );
};

export default NavBarLink;
