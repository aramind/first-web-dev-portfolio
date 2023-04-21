import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import cardImage from "./sample-card-image.jpg";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import muiTheme from "../../muiTheme";
import { useValue } from "../../context/ContextProvider";

const Header = () => {
  // date selected
  const {
    state: { selectedDate },
    dispatch,
  } = useValue();
  const formattedDate = format(selectedDate, "E MMM d, yyyy");

  // handlers
  const handleDatePickerChange = (date) => {
    dispatch({ type: "UPDATE_DATESELECTED", payload: date });
  };
  // TODO: remove this once implemented na
  const user = "Robin";
  return (
    <Box>
      <Card
        sx={{
          border: "1px solid gray",
          borderRadius: "20px",
          height: { xs: "280px", md: "420px" },
          width: { xs: "340px", md: "250px" },
          position: "relative",
        }}
      >
        {/* TODO: fix the avatar */}
        <Box
          // border="1px solid red"
          width="100%"
          pt={2}
        >
          <Avatar
            sx={{
              margin: "0 auto",
              height: "100px",
              width: "100px",
              display: { xs: "none", md: "block" },
            }}
          >
            RM
          </Avatar>
        </Box>
        <CardContent>
          <Box>
            {/* TODO: fix the wordings */}
            <Typography variant="h4">Hi {user}</Typography>
            <Typography
              margin="0.5rem 0"
              variant="body1"
            >
              Here is your summary for the last year from today!
            </Typography>
          </Box>
          <Box mt={3}>
            <DatePicker
              label={"Change Reference Date?"}
              value={selectedDate}
              onChange={handleDatePickerChange}
              format="MM/dd/yyyy"
              disableFuture={true}
              maxDate={new Date()}
              inputFormat="MM/dd/yyyy"
              timeZone="Asia/Manila"
            />
          </Box>
        </CardContent>
        <CardActions sx={{ position: "absolute", bottom: "5px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button size="small">Week</Button>
            <Button size="small">Month</Button>
            <Button size="small">Quarter</Button>
            <Button size="small">Year</Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Header;
