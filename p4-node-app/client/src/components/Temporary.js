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
import React, { useReducer, useRef, useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import muiTheme from "../muiTheme";
import { RestartAltOutlined, SaveOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import { useValue } from "../context/ContextProvider";
import { addToDaysRecord } from "../actions/activity";

const RecordPage = () => {
  // * Global states
  const {
    state: { selectedDate, activityNames, currentUser, todaysRecord },
    dispatch,
  } = useValue();
  const formattedDate = format(selectedDate, "E MMM d, yyyy");

  // * Local Sates
  // *references
  const hrsRef = useRef();
  const minsRef = useRef();
  const actRef = useRef();

  const genArrOfDigits = (n) => {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i.toString());
      // TODO: start from here
    }
    return arr;
  };

  console.log(todaysRecord);
  // const hrsArray = genArrOfDigits(24);
  // const minsArray = genArrOfDigits(60);

  // for progress bar
  let hoursRemaining = 23;
  const completedPercent = ((24 - hoursRemaining) / 24) * 100;

  // handers

  const handleDatePickerChange = (date) => {
    dispatch({ type: "UPDATE_DATESELECTED", payload: date });
  };

  const handleAdd = () => {
    let entry = {
      date: selectedDate,
      activity: actRef,
      hrs: hrsRef,
      mins: minsRef,
    };
    addToDaysRecord(entry, currentUser, dispatch);
  };
  const handleSubtract = () => {};

  // console LOGS

  console.log("FROM record Page");
  console.log(selectedDate);
  console.log(actRef);
  console.log(hrsRef);
  console.log(minsRef);
  console.log("ENd record Page");
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
            <DatePicker
              label={"Select Date"}
              value={selectedDate}
              onChange={handleDatePickerChange}
              format="MM/dd/yyyy"
              disableFuture={true}
              maxDate={new Date()}
              inputFormat="MM/dd/yyyy"
              timeZone="Asia/Manila"
              autoFocus
            />
          </Box>
          {/* ACTIVITY DROP DOWN */}
          <Autocomplete
            value={actRef}
            onChange={(event, newValue) => {
              actRef.current = newValue;
            }}
            id="select-activity"
            options={activityNames}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.label}
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
              value={hrsRef}
              onChange={(event, newValue) => {
                hrsRef.current = newValue;
              }}
              id="select-hrs"
              options={genArrOfDigits(24)}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hrs"
                />
              )}
            />
            {/* for mins */}
            <Autocomplete
              value={minsRef}
              onChange={(event, newValue) => {
                minsRef.current = newValue;
              }}
              id="select-mins"
              options={genArrOfDigits(60)}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.label}
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
              onClick={handleAdd}
            >
              Add
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubtract}
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
