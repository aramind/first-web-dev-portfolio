import React from "react";
import { Box, Toolbar } from "@mui/material";
import ChartDisplayWithDetails from "../components/charts/ChartDisplayWithDetails";
import muiTheme from "../muiTheme";

const ChartsPage = () => {
  return (
    <Box
      // alignItems={"center"}
      width="100%"
      display={"flex"}
      flexDirection={"column"}
      sx={{
        margin: "0 auto",
        // border: "1px solid green",
        [muiTheme.breakpoints.up("md")]: {
          width: { md: "95%", lg: "90%", xl: "50%" },
          // display: { md: "flex" },
        },
      }}
    >
      <Toolbar sx={{ marginBottom: "10px" }} />
      <Box>
        <ChartDisplayWithDetails />
      </Box>
    </Box>
  );
};

export default ChartsPage;
