import React, { useState } from "react";
import logs from "../data/logs.json";
import { Box, Toolbar, Typography } from "@mui/material";
import muiTheme from "../muiTheme";
import Header from "../components/summary-page-components/Header";
import SummaryCard from "../components/summary-page-components/SummaryCard";

const SummaryPage = () => {
  return (
    <Box
      // alignItems={"center"}
      width="100%"
      display={"flex"}
      flexDirection={"column"}
      sx={{
        margin: "0 auto",
        border: "1px solid green",
        [muiTheme.breakpoints.up("md")]: {
          width: { md: "95%", lg: "90%", xl: "50%" },
        },
      }}
    >
      <Toolbar sx={{ marginBottom: "10px" }} />
      {/* TODO: to remove once final na */}
      <Typography>Summary Page</Typography>
      {/* for main content */}
      <Box
        p={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "5px",
        }}
      >
        <Header />
        <Box
          backgroundColor="green"
          width={{ xs: "95vw", md: "60vw", xl: "60vw" }}
        >
          <SummaryCard />
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryPage;
