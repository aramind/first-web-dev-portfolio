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

const AddPage = () => {
  // const [todaysRecord, setTodaysRecord] = useState(initialTodaysRecord);
  const [todaysRecord, setTodaysRecord] = useState(
    JSON.parse(localStorage.getItem("records")) || initialTodaysRecord
  );
  const [options, setOptions] = useState(initialOptions);
  const [activity, setActivity] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");

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

  const getRemainingTime = () => {
    const totalHrs = labels.reduce(
      (total, activity) => total + todaysRecord[activity],
      0
    );
    const minsRemaining = (24 - totalHrs) * 60;
    return `${Math.floor(minsRemaining / 60)} hr(s) and ${Math.floor(
      minsRemaining % 60
    )} min(s)`;
  };

  const tds = [];

  for (const label of labels) {
    const hrs = (+todaysRecord[label]).toFixed(1);
    const percent = ((todaysRecord[label] / 24) * 100).toFixed(2);
    tds.push({ label, hrs, percent });
  }

  return (
    <div className="page add-page">
      <div className="add-page__inputs">
        <DropdownList
          placeHolder="Select..."
          options={options}
          onChange={(value) => setActivity(value.value)}
        />

        <AddPageInputForm
          className="add-page__input input--hr"
          max={24}
          label="hrs and"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <AddPageInputForm
          className="add-page__input input--min"
          max={60}
          label="mins"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />

        <div className="add-page__buttons">
          <Button
            label="Add"
            className="add-page__button"
            onClick={() => {
              setTodaysRecord((prevState) => ({
                ...prevState,
                [activity]:
                  prevState[activity] + Number(hours) + Number(minutes / 60),
              }));
              localStorage.setItem("records", JSON.stringify(todaysRecord));
            }}
          />
          <Button
            label="Subtract"
            className="add-page__button"
            onClick={() => {
              setTodaysRecord((prevState) => ({
                ...prevState,
                [activity]:
                  prevState[activity] - Number(hours) - Number(minutes / 60),
              }));
            }}
          />
        </div>
      </div>

      <ErrorMessage message={errorMsg} />
      <div className="add-page__visuals">
        {/* <div
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
        </div> */}
        <div
          id="add-page-chart2"
          className="add-page-visual"
        >
          <BarChart todaysRecord={todaysRecord} />
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
          <PieChart todaysRecord={todaysRecord} />
        </div>
      </div>

      <div className="add-page__status">
        <p>Remaining Time : {`${getRemainingTime()}`}</p>
      </div>

      <div className="add-page__controls">
        <Button
          label="Save Record"
          className="add-page__control add-page__control--save"
        />
        <Button
          label="Clear"
          className="add-page__control add-page__control--clear"
        />
      </div>
    </div>
  );
};

export default AddPage;
