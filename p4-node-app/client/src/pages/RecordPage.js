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
  RestartAltOutlined,
  Save,
  SaveOutlined,
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
      {/* TODO: to remove once final na */}
      <Typography>Record</Typography>
      {/* for main content */}
      <Box
        width="100%"
        gap="1rem"
        sx={{
          margin: "0 auto",
          // border: "1px solid green",
          [muiTheme.breakpoints.up("md")]: {
            // width: { md: "95%", lg: "90%", xl: "70%" },
            display: { md: "flex" },
          },
        }}
      >
        <Stack
          flex={1}
          gap={2}
          alignItems="center"
          sx={
            {
              // border: "1px solid red",
            }
          }
        >
          {/* container for form fields */}
          {/* date display */}
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
            <Typography variant="h5">{formattedDate}</Typography>
          </Box>
          {/* date picker */}
          {/* TODO:(minor) make the date picker occupy the whole width of the parent */}
          <Box
            width={"100%"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            width="100%"
            px={1}
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
                sx={{ height: "15px" }}
              />
            </Box>
          </Box>
          {/* Buttons */}
          <Stack
            px={1}
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
        </Stack>

        {/* BOX 2 */}
        <Box
          flex={3}
          sx={
            {
              // border: "1px solid blue",
            }
          }
        >
          {/* Summary and chart */}
          <Box
            sx={{
              // border: "1px solid blue",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Box
              width="500px"
              height="400px"
              sx={{ backgroundColor: "blue" }}
            >
              Summary
            </Box>
            <Box
              width="300px"
              height="400px"
              sx={{ backgroundColor: "blue" }}
            >
              chart
            </Box>
          </Box>
          {/* text info */}
          <Stack
            px={1}
            my={1}
          >
            <Typography variant="caption">
              Save/Archived selected date's record to database? - SAVE
            </Typography>

            <Typography variant="caption">
              Reset selected date's records? - RESET
            </Typography>
          </Stack>
          {/* save and clear */}
          <Stack
            px={1}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              fullWidth
              variant="contained"
              size="large"
              endIcon={<SaveOutlined />}
              sx={{ py: "1rem" }}
            >
              Save
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              endIcon={<RestartAltOutlined />}
              sx={{ py: "1rem" }}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* END */}
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
