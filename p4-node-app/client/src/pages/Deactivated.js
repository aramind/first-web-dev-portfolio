import { Box, Typography } from "@mui/material";
import React from "react";

const Deactivated = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      p="2rem"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box width="60%">
        <Typography
          fontSize="1.2rem"
          textAlign="center"
          fontFamily="Prompt"
        >
          Your account has been deactivated. To reactivate your account and
          regain access to our app's features and your past data, please
          navigate to your user settings.
        </Typography>
      </Box>
    </Box>
  );
};

export default Deactivated;
