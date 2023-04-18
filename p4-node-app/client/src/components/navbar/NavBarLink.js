import { Link } from "@mui/material";
import React from "react";

const NavBarLink = ({ name, to }) => {
  return (
    <Link
      color="inherit"
      underline="none"
      href={to}
      fontSize="20px"
      px={1}
      sx={{
        "&:hover": {
          color: "red", //TODO: finalize the color
          textDecoration: "underline",
        },
      }}
    >
      {name}
    </Link>
  );
};

export default NavBarLink;
