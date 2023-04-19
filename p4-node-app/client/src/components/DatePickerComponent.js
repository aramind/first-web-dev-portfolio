import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import { TextField } from "@mui/material";
import muiTheme from "../muiTheme";

const DatePickerComponent = ({ focused }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            style={{
              borderColor: muiTheme.palette.primary.main,
            }}
          />
        )}
        format="MM/dd/yyyy"
        disableFuture={true}
        maxDate={new Date()}
        inputFormat="MM/dd/yyyy"
        timeZone="Asia/Manila"
        autoFocus={focused}
      />
    </>
  );
};

export default DatePickerComponent;
