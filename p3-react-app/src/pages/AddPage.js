import "./AddPage.css";
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

//start of refactoring
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
// end of refactoring
const AddPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCleared, setShowCleared] = useState(false);
  // const [hasError, setHasError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // from context provider(s)
  const { pastRecords, setPastRecords } = useContext(DataContext);

  //start of refactoring

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(state.todaysRecord));
  }, [state.todaysRecord]);

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

  let totalHrsRemaining =
    24 -
    labels.reduce((total, activity) => total + state.todaysRecord[activity], 0);

  const tds = [];

  for (const label of labels) {
    const hrs = (+state.todaysRecord[label]).toFixed(1);
    const percent = ((state.todaysRecord[label] / 24) * 100).toFixed(2);
    tds.push({ label, hrs, percent });
  }

  const updateTodaysRecord = (prevState, activity, hours, minutes) => {
    return {
      ...prevState,
      [activity]: prevState[activity] + Number(hours) + Number(minutes / 60),
    };
  };

  let inputHasError = false;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validations
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

  const handleFormSubmitForSubtract = (e) => {
    e.preventDefault();
    // if (
    //   !state.activity.trim() ||
    //   state.activity === "" ||
    //   state.activity === null
    // ) {
    //   inputHasError = true;
    //   dispatch({
    //     type: "SET_ERROR_MSG",
    //     payload: { value: "Activity cannot be blank" },
    //   });
    //   console.log("im in a act validation dispatch");
    //   return;
    // }

    // if (state.hours === 0 && state.minutes === 0) {
    //   inputHasError = true;
    //   dispatch({
    //     type: "SET_ERROR_MSG",
    //     payload: { value: "Duration cannot be blank" },
    //   });
    //   console.log("im in a hrs 0 validation dispatch");
    //   return;
    // }

    // if (state.hours > 24 || state.minutes > 60) {
    //   inputHasError = true;
    //   dispatch({
    //     type: "SET_ERROR_MSG",
    //     payload: { value: "Invalid value for duration" },
    //   });
    //   console.log("im in a hrs > 24 validation dispatch");
    //   return;
    // }

    // const totalDuration = state.hours + state.minutes / 60;
    // if (totalDuration > totalHrsRemaining) {
    //   inputHasError = true;
    //   dispatch({
    //     type: "SET_ERROR_MSG",
    //     payload: { value: "Duration exceeds remaining time" },
    //   });
    //   return;
    // }

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

  const handleAdd = (e) => {
    handleFormSubmit(e);
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

  // const handleClear = () => {
  //   let ans = "";
  //   while (ans !== "n" && ans !== "y") {
  //     ans = prompt(
  //       "Are you sure you want to clear records for the current day? <y/n>"
  //     );
  //     ans.toLowerCase();
  //   }
  //   if (ans === "y") {
  //     dispatch({ type: "RESET_FIELDS" });
  //     localStorage.removeItem("records");
  //     // dispatch({type: "SET_TODAYS_RECORD", payload: {value: }})
  //     dispatch({
  //       type: "SET_TODAYS_RECORD",
  //       payload: { value: initialTodaysRecord },
  //     });
  //     setShowCleared(true);
  //   } else return;
  // };

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

  const handleActivityChange = (value) => {
    dispatch({ type: "SET_ACTIVITY", payload: { value: value.value } });
  };

  const handleHoursChange = (e) => {
    dispatch({
      type: "SET_HOURS",
      payload: { value: parseInt(e.target.value) },
    });
  };

  const handleMinuteChange = (e) => {
    dispatch({
      type: "SET_MINUTES",
      payload: { value: parseInt(e.target.value) },
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

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

      if (existingRecordIndex !== -1) {
        const shouldOverwrite = window.confirm(
          `Data for ${newRecord.date} already exists. Overwrite?`
        );

        if (shouldOverwrite) {
          // Overwrite the existing record
          const updatedRecords = [...pastRecords];
          updatedRecords[existingRecordIndex] = newRecord;
          setPastRecords(updatedRecords);
        }

        // Reset the inputs and summary table for the new day
        handleClear();
      } else {
        // Add the new record to pastRecords
        setPastRecords([...pastRecords, newRecord]);
      }
    } else {
      inputHasError = true;
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Consume first all the remaining time" },
      });
    }
  };

  return (
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

        <div
          id="add-page-table"
          className="add-page-visual"
        >
          <p className="table-title">Summary for Today</p>
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
        <div className="date-picker">
          <p>Select a date</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            id="date-picker-comp"
            timeZone="Asia/Manila"
          />
        </div>
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
  );
};

export default AddPage;
