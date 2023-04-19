import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const WelcomeBackPage = () => {
  const {
    state: { currentUser },
  } = useValue();

  return (
    <Box
      alignItems={"center"}
      width="100vw"
    >
      <Toolbar sx={{ marginBottom: "10px" }} />
      <Box
        minHeight={"20vh"}
        height={{ md: "40vh" }}
        width={{ sx: "100vw", md: "60vw" }}
        backgroundColor="lightblue"
        sx={{ marginInline: "auto", my: "30px" }}
      >
        welcome back
      </Box>
    </Box>
  );
};

export default WelcomeBackPage;
