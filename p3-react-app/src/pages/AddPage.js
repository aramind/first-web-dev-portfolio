import "./AddPage.css";
import React, { useEffect, useReducer, useState } from "react";
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

ChartJS.register(ArcElement, Tooltip, Legend);

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
//start of refactoring
const initialState = {
  todaysRecord:
    JSON.parse(localStorage.getItem("records")) || initialTodaysRecord,
  options: initialOptions,
  activity: "others",
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
    case "SET_HASERROR":
      return { ...state, hasError: payload.value };
    case "SET_ERROR_MSG":
      return { ...state, errorMsg: payload.value };
    case "RESET_FIELDS":
      return {
        ...state,
        // todaysRecord: initialTodaysRecord,
        // activity: "",
        hours: 0,
        minutes: 0,
        hasError: false,
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

  console.log(`rendering...`);
  console.log(state.todaysRecord);
  //start of refactoring

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(state.todaysRecord));
  }, [state.todaysRecord, state.activity, state.hours, state.minutes]);

  console.log(`rendering after...`);
  console.log(state.todaysRecord);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validations
    if (
      !state.activity.trim() ||
      state.activity === "" ||
      state.activity === null
    ) {
      console.log("error: no activity");
      dispatch({ type: "SET_HASERROR", payload: { value: true } });
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Activity cannot be blank" },
      });
      return;
    }

    if (state.hours === 0 && state.minutes === 0) {
      console.log("error: value");
      dispatch({ type: "SET_HASERROR", payload: { value: true } });
      dispatch({
        type: "SET_ERROR_MSG",
        payload: { value: "Duration cannot be blank" },
      });
      return;
    }
  };

  const handleAdd = (e) => {
    handleFormSubmit(e);
    if (!state.hasError) {
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
    handleFormSubmit(e);
    if (!state.hasError) {
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

  const handleClear = () => {
    let ans = "";
    while (ans !== "n" && ans !== "y") {
      ans = prompt(
        "Are you sure you want to clear records for the current day? <y/n>"
      );
      ans.toLowerCase();
    }
    if (ans === "y") {
      dispatch({ type: "RESET_FIELDS" });
      localStorage.removeItem("records");
      // dispatch({type: "SET_TODAYS_RECORD", payload: {value: }})
      dispatch({
        type: "SET_TODAYS_RECORD",
        payload: { value: initialTodaysRecord },
      });
      setShowCleared(true);
    } else return;
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

  return (
    <div className="page add-page">
      <div className="add-page__inputs">
        <DropdownList
          placeHolder="Select Activity . . ."
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

      <ErrorMessage message={state.errorMsg} />
      <div className="add-page__visuals">
        <div
          id="add-page-chart2"
          className="add-page-visual"
        >
          <BarChart todaysRecord={state.todaysRecord} />
        </div>

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
        <Button
          label="Save Record"
          className="add-page__control add-page__control--save"
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
