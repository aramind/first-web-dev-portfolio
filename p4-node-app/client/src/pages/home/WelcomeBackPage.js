import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const WelcomeBackPage = () => {
  const {
    state: { currentUser },
  } = useValue();

  return (
    <Box>
      <Toolbar sx={{ marginBottom: "10px" }} />
      {`Welcome Back ${currentUser.name}`}
    </Box>
  );
};

export default WelcomeBackPage;
