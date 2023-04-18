import { Link } from "@mui/material";
import React from "react";
import { theme } from "../../muiTheme";

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
          color: theme.palette.hovercolor.text, //TODO: finalize the color
          textDecoration: "underline",
        },
      }}
    >
      {name}
    </Link>
  );
};

export default NavBarLink;
