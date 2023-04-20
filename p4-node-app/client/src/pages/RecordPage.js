import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import muiTheme from "../muiTheme";
import DatePickerComponent from "../components/DatePickerComponent";
import { format } from "date-fns-tz";
import Dropdown from "../components/form-record/Dropdown";
import {
  FitnessCenter,
  Hotel,
  MenuBook,
  MoreVert,
  People,
  SelfImprovement,
  VideogameAsset,
  WorkHistory,
} from "@mui/icons-material";

const RecordPage = () => {
  // date selected

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "E MMM d, yyyy");

  // select activities dropdown
  const activityIcons = [
    { label: "sleep", icon: <Hotel /> },
    { label: "work", icon: <WorkHistory /> },
    { label: "learn", icon: <MenuBook /> },
    { label: "self", icon: <SelfImprovement /> },
    { label: "social", icon: <People /> },
    { label: "play", icon: <VideogameAsset /> },
    { label: "fitness", icon: <FitnessCenter /> },
    { label: "others", icon: <MoreVert /> },
  ];

  const activities = [
    "sleep",
    "work",
    "learn",
    "self",
    "social",
    "play",
    "fitness",
    "others",
  ];

  const [selectedActivity, setSelectedActivity] = useState();

  console.log(selectedActivity);

  return (
    <Box
      alignItems={"center"}
      width="100%"
      display={"flex"}
      flexDirection={"column"}
    >
      <Toolbar sx={{ marginBottom: "10px" }} />
      {/* TODO: to remove once final na */}
      <Typography>Record</Typography>
      {/*TODO: Form Fields */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          width: "95%", // default width for extra-small screens
          // for medium and larger screens
          [muiTheme.breakpoints.up("md")]: {
            width: { md: "90%", lg: "90%", xl: "70%" },
            gap: { md: "1rem", lg: "2rem", xl: "4rem" },
            // justifyContent: "space-between",
          },
        }}
        // border={"1px solid red"}
      >
        {/* Container for the Date picker with date */}
        <Box
          textAlign="center"
          minWidth="300px"
          alignItems={"center"}
          // sx={{ gap: "rem", border: "1px solid red" }}
        >
          <Box
            my={"1rem"}
            width={"100%"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              // border: "1px solid red",
              color: muiTheme.palette.primary.main,
            }}
          >
            <Typography
              mb={1}
              variant="h5"
            >
              {formattedDate}
            </Typography>
          </Box>
          {/* TODO: place Date, and Date Picker */}

          <Box
            my={"1rem"}
            width={"100%"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              // border: "1px solid red",
              color: muiTheme.palette.primary.main,
            }}
          >
            <DatePickerComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              focused={false}
            />
          </Box>
          {/* ACTIVITY DROP DOWN */}
          <Autocomplete
            value={selectedActivity}
            onChange={(event, newValue) => {
              setSelectedActivity(newValue);
            }}
            id="controllable-states-demo"
            options={activities}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Activity"
              />
            )}
          />
        </Box>
        {/*TODO: Summary Table */}
        <Box
          width="300px"
          height="300px"
          sx={{ backgroundColor: "blue" }}
        >
          SummaryTable
        </Box>
        {/*TODO: Charts */}
        <Box
          width="300px"
          height="300px"
          backgroundColor="blue"
        >
          chart
        </Box>
      </Box>
      <Stack>
        {/*TODO: save record button */}
        {/*TODO: reset button */}
      </Stack>
      <Box
        // sx={{ border: "1px solid red" }}
        px={4}
        py={1}
        mb={4}
      >
        <Typography mb={1}>What to do next?</Typography>
        <SideBar />
      </Box>
    </Box>
  );
};

export default RecordPage;
