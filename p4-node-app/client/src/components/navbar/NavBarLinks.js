import React from "react";
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import NavBarLink from "./NavBarLink";

const linkNames = [
  { name: "Home", to: "/" },
  { name: "Add Record", to: "/" },
  { name: "Charts", to: "/" },
  { name: "Summary", to: "/" },
  { name: "Read", to: "/" },
];
const NavBarLinks = () => {
  const {
    state: { currentUser },
  } = useValue();

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
      >
        {linkNames.map((item) => (
          <NavBarLink
            name={item.name}
            to={item.to}
          ></NavBarLink>
        ))}
      </Stack>
      <Tooltip title={currentUser ? currentUser.name : "User"}>
        <IconButton>
          <Avatar
            src={currentUser?.photoURL}
            alt={currentUser?.name}
          >
            {currentUser.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default NavBarLinks;
