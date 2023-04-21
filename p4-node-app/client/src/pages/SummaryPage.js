import React, { useState } from "react";
import logs from "../data/logs.json";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import muiTheme from "../muiTheme";

import Header from "../components/summary-page-components/Header";
import SummaryCard from "../components/summary-page-components/SummaryCard";

const SummaryPage = () => {
  // TODO: to replace
  const activityNames = [
    "SLEEP",
    "WORK",
    "LEARN",
    "SELF",
    "SOCIAL",
    "PLAY",
    "FITNESS",
    "OTHERS",
  ];
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
          width: { md: "98%", lg: "96%", xl: "60%" },
        },
      }}
    >
      <Toolbar sx={{ marginBottom: "10px" }} />
      {/* TODO: to remove once final na */}
      {/* <Typography>Summary Page</Typography> */}
      {/* for main content */}
      <Box
        width="100%"
        // gap="1rem"

        sx={{
          margin: "10px auto",
          // border: "1px solid green",
          [muiTheme.breakpoints.up("sm")]: {
            display: { sm: "flex" },
          },
        }}
      >
        <Box
          mb={2}
          mx={1}
          sx={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Header />
          {/* </Box> */}
        </Box>
        <Box
          // flex={4}
          sx={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {activityNames.map((title) => (
            <SummaryCard title={title} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryPage;
