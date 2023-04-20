import {
  Autocomplete,
  Box,
  Button,
  LinearProgress,
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

  const [selectedActivity, setSelectedActivity] = useState(null);

  // hrs and minutes
  const [hrs, setHrs] = useState(null);
  const [mins, setMins] = useState(null);

  const genArrOfDigits = (n) => {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i.toString());
    }
    return arr;
  };

  // const hrsArray = genArrOfDigits(24);
  // const minsArray = genArrOfDigits(60);

  // for progress bar
  let hoursRemaining = 23;
  const completedPercent = ((24 - hoursRemaining) / 24) * 100;
  console.log(selectedActivity);
  console.log(hrs);
  console.log(mins);

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
          minWidth="300px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "start",
            gap: "1rem",
          }}
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
            <Typography variant="h4">{formattedDate}</Typography>
          </Box>
          {/* TODO:(minor) make the date picker occupy the whole width of the parent */}
          <Box
            width={"100%"}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              minWidth: "300px",
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
            id="select-avtivity"
            options={activities}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Activity"
              />
            )}
          />
          {/* hrs and minutes */}
          <Stack
            direction={"row"}
            maxWidth={"300px"}
            gap={2}
          >
            {/* for hrs */}
            <Autocomplete
              value={hrs}
              onChange={(event, newValue) => {
                setHrs(newValue);
              }}
              id="select-hrs"
              options={genArrOfDigits(24)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hrs"
                />
              )}
            />
            {/* for mins */}
            <Autocomplete
              value={mins}
              onChange={(event, newValue) => {
                setMins(newValue);
              }}
              id="select-mins"
              options={genArrOfDigits(60)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Mins"
                />
              )}
            />
          </Stack>
          {/* Progress Bar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              fontSize={"1.2rem"}
              color="primary"
              gutterBottom
            >
              {hoursRemaining} hrs remaining
            </Typography>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={completedPercent}
                sx={{ height: "10px" }}
              />
            </Box>
          </Box>
          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              fullWidth
              variant="contained"
            >
              Add
            </Button>
            <Button
              fullWidth
              variant="contained"
            >
              Subtract
            </Button>
          </Stack>
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: "100%", border: "1px solid red" }}
        justifyContent={"end"}
      >
        <Button
          size="large"
          variant="contained"
          sx={{ minWidth: "200px", py: "0.5rem" }}
        >
          Save
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ minWidth: "200px", py: "0.5rem" }}
        >
          Reset
        </Button>
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
