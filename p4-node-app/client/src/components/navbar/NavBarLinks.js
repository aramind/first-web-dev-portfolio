import React from "react";
import { Avatar, Box, IconButton, Link, Stack, Tooltip } from "@mui/material";
import { useValue } from "../../context/ContextProvider";

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
        <Link
          color="inherit"
          underline="none"
          href="/"
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="/"
        >
          Add Record
        </Link>
        <Link
          color="inherit"
          href="/"
        >
          Charts
        </Link>
        <Link
          color="inherit"
          href="/"
        >
          Summary
        </Link>
        <Link
          color="inherit"
          href="/"
        >
          Read
        </Link>
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
