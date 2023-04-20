import React, { useState } from "react";
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import NavBarLink from "./NavBarLink";
import UserMenu from "../user/UserMenu";

const linkNames = [
  { name: "Home", to: "/" },
  { name: "Record", to: "/record" },
  { name: "Charts", to: "/charts" },
  { name: "Summary", to: "/summary   " },
  // { name: "Read", to: "/read        " },
];
const NavBarLinks = () => {
  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
    >
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        //
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        {linkNames.map((item) => (
          <NavBarLink
            key={`navbarLink_${item.name}`}
            name={item.name}
            to={item.to}
          ></NavBarLink>
        ))}
      </Stack>
      <Tooltip title={currentUser ? currentUser.name : "User"}>
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar
            src={currentUser?.photoURL}
            alt={currentUser?.name}
          >
            {currentUser.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Stack>
  );
};

export default NavBarLinks;
