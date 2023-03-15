import React, { useContext, useEffect, useReducer, useState } from "react";
import AddPageInputForm from "../components/AddPageInputForm";
import DropdownList from "../components/DropdownList";
import Button from "../components/Button";
import TableDetail from "../components/TableDetail";
import ErrorMessage from "../components/ErrorMessage";
import PieChart from "../components/PieChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import BarChart from "../components/BarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../contextprovider/DataContextProvider";
import "./AddPage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const initialOptions = [
  { value: "sleep", label: "sleep" },
  { value: "work", label: "work" },
  { value: "learn", label: "learn" },
  { value: "self", label: "self" },
  { value: "social", label: "social" },
  { value: "play", label: "play" },
  { value: "fitness", label: "fitness" },
  { value: "others", label: "others" },
];

const initialTodaysRecord = {
  sleep: 0,
  work: 0,
  learn: 0,
  self: 0,
  social: 0,
  play: 0,
  fitness: 0,
  others: 0,
};

// initial state for useReducer
const initialState = {
  todaysRecord:
    JSON.parse(localStorage.getItem("records")) || initialTodaysRecord,
  options: initialOptions,
  activity: initialOptions[0].label,
  hours: 0,
  minutes: 0,
  hasError: false,
  errorMsg: " ",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_TODAYS_RECORD":
      return { ...state, todaysRecord: payload.value };
    case "SET_ACTIVITY":
      return { ...state, activity: payload.value };
    case "SET_HOURS":
      return { ...state, hours: payload.value };
    case "SET_MINUTES":
      return { ...state, minutes: payload.value };
    // case "SET_HASERROR":
    //   return { ...state, hasError: payload.value };
    case "SET_ERROR_MSG":
      return { ...state, errorMsg: `Error: ${payload.value}` };
    case "RESET_FIELDS":
      return {
        ...state,
        // todaysRecord: initialTodaysRecord,
        // activity: "",
        hours: 0,
        minutes: 0,
        // hasError: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};

const AddPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCleared, setShowCleared] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  // from context provider(s)
  const { pastRecords, setPastRecords } = useContext(DataContext);

  // updates the copy of todays record on local storage
  // at each renders of this page
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(state.todaysRecord));
  }, [state.todaysRecord]);

  // labels for the chart and table
  const labels = [
    "sleep",
    "work",
    "learn",
    "self",
    "social",
    "play",
    "fitness",
    "others",
  ];

  // computes for the total hours remaining of the current day
  let totalHrsRemaining =
    24 -
    labels.reduce((total, activity) => total + state.todaysRecord[activity], 0);

  const tds = [];

  // populates the summary table with the numerical data from todays current record
  for (const label of labels) {
    const hrs = (+state.todaysRecord[label]).toFixed(1);
    const percent = ((state.todaysRecord[label] / 24) * 100).toFixed(2);
    tds.push({ label, hrs, percent });
  }

  // updates todays record state
  const updateTodaysRecord = (prevState, activity, hours, minutes) => {
    return {
      ...prevState,
      [activity]: prevState[activity] + Number(hours) + Number(minutes / 60),
    };
  };

  // input validations COMMON ot add and subtract buttons
  let inputHasError = false;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !state.activity.trim() ||
      state.activity === "" ||
      state.activity === null
    ) {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Activity cannot be blank" },
      });
      console.log("im in a act validation dispatch");
      return;
    }

    if (state.hours === 0 && state.minutes === 0) {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Duration cannot be blank" },
      });
      console.log("im in a hrs 0 validation dispatch");
      return;
    }

    if (state.hours > 24 || state.minutes > 60) {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Invalid value for duration" },
      });
      console.log("im in a hrs > 24 validation dispatch");
      return;
    }
  };

  // additional input validation for the add button only
  const handleFormSubmitForAdd = (e) => {
    e.preventDefault();
    const totalDuration = state.hours + state.minutes / 60;
    if (totalDuration > totalHrsRemaining) {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Duration exceeds remaining time" },
      });
      return;
    }
  };

  // additional input validation of the subtract button
  const handleFormSubmitForSubtract = (e) => {
    e.preventDefault();
    const currentHours = state.todaysRecord[state.activity];
    const hoursToSubtract = state.hours + state.minutes / 60;
    if (hoursToSubtract > currentHours) {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: {
          value: `Cannot subtract more than the current hours for ${state.activity}`,
        },
      });
      return;
    }
  };

  // handler for the onclick of add button
  // adds the inputted hours and minutes to todays record for the activity selected
  const handleAdd = (e) => {
    handleFormSubmit(e);
    handleFormSubmitForAdd(e);
    // console.log(`${state.hasError} from handle add`);
    if (!inputHasError) {
      dispatch({
        type: "SET_TODAYS_RECORD",
        payload: {
          value: updateTodaysRecord(
            state.todaysRecord,
            state.activity,
            state.hours,
            state.minutes
          ),
        },
      });
      dispatch({ type: "RESET_FIELDS" });
    }
  };

  // handler for the onclick of subtract button
  // subtracts the inputted hours and minutes to todays record for the activity selected
  const handleSubtract = (e) => {
    handleFormSubmitForSubtract(e);
    handleFormSubmit(e);
    if (!inputHasError) {
      dispatch({
        type: "SET_TODAYS_RECORD",
        payload: {
          value: updateTodaysRecord(
            state.todaysRecord,
            state.activity,
            -state.hours,
            -state.minutes
          ),
        },
      });
      dispatch({ type: "RESET_FIELDS" });
    }
  };

  // handler for the onclick of the clear button
  // clears the summary table
  // also called whenever there will be a successful saving of todaysRecord to pastRecords
  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear records for the current day?"
    );
    if (confirmed) {
      dispatch({ type: "RESET_FIELDS" });
      localStorage.removeItem("records");
      dispatch({
        type: "SET_TODAYS_RECORD",
        payload: { value: initialTodaysRecord },
      });
      setShowCleared(true);
    }
  };

  // clears the fields without confirmation
  const doHardClear = () => {
    dispatch({ type: "RESET_FIELDS" });
    localStorage.removeItem("records");
    dispatch({
      type: "SET_TODAYS_RECORD",
      payload: { value: initialTodaysRecord },
    });
    setShowCleared(true);
  };

  // handles the updating of activity state via the dropdown component
  const handleActivityChange = (value) => {
    dispatch({ type: "SET_ACTIVITY", payload: { value: value.value } });
  };

  // handles the updating of the hours state via the input form for hours
  const handleHoursChange = (e) => {
    dispatch({
      type: "SET_HOURS",
      payload: { value: parseInt(e.target.value) },
    });
  };

  // handles the updating of the minutes state via the input form for minutes
  const handleMinuteChange = (e) => {
    dispatch({
      type: "SET_MINUTES",
      payload: { value: parseInt(e.target.value) },
    });
  };

  // handler for save record button
  // adds the finished 24 hrs record to the past record on the local storage
  // via a method through the context provider, since the context provider
  // serves as the gatekeeper to the past records data stored on local storage
  const handleSave = (e) => {
    e.preventDefault();
    let currentDate = selectedDate.toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    // Check if remaining hours is zero
    if (totalHrsRemaining === 0) {
      // Create a new record object with the current date and activities from todaysRecord
      const newRecord = {
        date: selectedDate.toISOString().slice(0, 10),
        activities: Object.keys(state.todaysRecord).map((activity) => ({
          name: activity.toUpperCase(),
          hours: state.todaysRecord[activity],
        })),
      };

      // Check for duplication
      const existingRecordIndex = pastRecords.findIndex(
        (record) => record.date === newRecord.date
      );

      // confirmation to overwrite if there's existing record for that date
      if (existingRecordIndex !== -1) {
        const shouldOverwrite = window.confirm(
          `Data for ${newRecord.date} already exists. Overwrite?`
        );

        if (shouldOverwrite) {
          // Overwrite the existing record
          const updatedRecords = [...pastRecords];
          updatedRecords[existingRecordIndex] = newRecord;
          setPastRecords(updatedRecords);

          alert(`Record for ${currentDate} successfully saved!`);

          // Reset the inputs and summary table for the new day
          doHardClear();
        }
      } else {
        // Add the new record to pastRecords
        setPastRecords([...pastRecords, newRecord]);
        alert(`Record for ${currentDate} successfully saved!`);

        // Reset the inputs and summary table for the new day
        doHardClear();
        // dispatch({
        //   type: "SET_ERROR_MSG",
        //   payload: { value: "Record saved successfully!" },
        // });
      }
    } else {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Consume first all the remaining time" },
      });
    }
  };

  const handleDateChange = (date) => {
    const confirmed = window.confirm(
      "Changing date will reset all fields.\nEntries for the current date (if there's any) will be lost.\nDo you wish to continue?"
    );
    if (confirmed) {
      doHardClear();
      setSelectedDate(date);
    }
  };
  useEffect(() => {
    // const confirmed = window.confirm(
    //   "Changing date will reset all fields.\nEntries for the current date (if there's any) will be lost.\nDo you wish to continue?"
    // );
    // if (confirmed) {
    //   doHardClear();
    // } else {
    //   setSelectedDate(prevSelectedDate);
    // }
  }, [selectedDate]);

  return (
    <div>
      <div className="page add-page">
        <div className="add-page__inputs">
          <DropdownList
            placeHolder={state.options[0].label}
            options={state.options}
            // onChange={(value) => setActivity(value.value)}
            onChange={handleActivityChange}
          />

          <AddPageInputForm
            className="add-page__input input--hr"
            max={24}
            label="hrs and"
            value={state.hours}
            // onChange={(e) => setHours(e.target.value)}
            onChange={handleHoursChange}
          />
          <AddPageInputForm
            className="add-page__input input--min"
            max={60}
            label="mins"
            value={state.minutes}
            onChange={handleMinuteChange}
          />

          <div className="add-page__buttons">
            <Button
              label="Add"
              className="add-page__button"
              onClick={handleAdd}
            />
            <Button
              label="Subtract"
              className="add-page__button"
              onClick={handleSubtract}
            />
          </div>
        </div>
        {<ErrorMessage errorMsg={state.errorMsg} />}
        <div className="add-page__visuals">
          {/* <div
          id="add-page-chart2"
          className="add-page-visual"
        >
          <BarChart todaysRecord={state.todaysRecord} />
        </div> */}
          <div className="date-picker">
            <div className="date-display date-display__day">
              {
                selectedDate
                  .toLocaleDateString("en-PH", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  .split(",")[0]
              }
            </div>
            <div className="date-display date-display__date">
              {selectedDate
                .toLocaleDateString("en-PH", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                .substring(5)}
            </div>
            <p className="text-for-dPicker">Select a date</p>
            <div id="date-picker">
              <DatePicker
                selected={selectedDate}
                onChange={
                  (date) => handleDateChange(date)
                  // setPrevSelectedDate(selectedDate);
                  // setSelectedDate(date);
                }
                dateFormat="yyyy-MM-dd"
                id="date-picker-comp"
                timeZone="Asia/Manila"
              />
            </div>
          </div>
          <div
            id="add-page-table"
            className="add-page-visual"
          >
            <p className="table-title">
              Summary for{" "}
              {selectedDate.toLocaleDateString("en-PH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <div className="table-head">
              <p>Activity</p>
              <p>Total (hrs)</p>
              <p>% of the Day</p>
            </div>
            <div className="table-details">
              {tds.map((e, index) => (
                <TableDetail
                  key={index}
                  label={e.label}
                  hrs={e.hrs}
                  percent={e.percent}
                />
              ))}
            </div>
          </div>
          <div
            id="add-page-chart"
            className="add-page-visual"
          >
            <PieChart todaysRecord={state.todaysRecord} />
          </div>
        </div>
        <div className="add-page__status">
          <p>
            Remaining Time : {Math.floor(totalHrsRemaining)} hrs and{" "}
            {((Number(totalHrsRemaining) * 60) % 60).toFixed(0)} mins
          </p>
        </div>
        <div className="add-page__controls">
          <Button
            label="Save Record"
            className="add-page__control add-page__control--save"
            onClick={handleSave}
          />
          <Button
            label="Clear"
            className="add-page__control add-page__control--clear"
            onClick={handleClear}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
