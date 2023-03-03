import "./AddPage.css";
import React, { useEffect, useReducer, useState } from "react";
import AddPageInputForm from "../components/AddPageInputForm";
import DropdownList from "../components/DropdownList";
import Button from "../components/Button";
import TableDetail from "../components/TableDetail";

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

const AddPage = ({ records, setRecords }) => {
  const [todaysRecord, setTodaysRecord] = useState(initialTodaysRecord);
  const [options, setOptions] = useState(initialOptions);
  const [activity, setActivity] = useState(" ");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // const newRecord = {
  //   activity: activity,
  //   hours: hours,
  //   minutes: minutes,
  // };

  const getRemainingTime = () => {
    let mins =
      (24 -
        todaysRecord.sleep -
        todaysRecord.work -
        todaysRecord.learn -
        todaysRecord.self -
        todaysRecord.social -
        todaysRecord.play -
        todaysRecord.fitness -
        todaysRecord.others) *
      60;
    return `${Math.floor(mins / 60)} hr(s) and ${Math.floor(mins % 60)} min(s)`;
  };

  const tds = [
    {
      label: "sleep",
      hrs: `${(+todaysRecord.sleep).toFixed(1)}`,
      percent: `${((todaysRecord.sleep / 24) * 100).toFixed(2)}`,
    },
    {
      label: "work",
      hrs: `${(+todaysRecord.work).toFixed(1)}`,
      percent: `${((todaysRecord.work / 24) * 100).toFixed(2)}`,
    },
    {
      label: "learn",
      hrs: `${(+todaysRecord.learn).toFixed(1)}`,
      percent: `${((todaysRecord.learn / 24) * 100).toFixed(2)}`,
    },
    {
      label: "self",
      hrs: `${(+todaysRecord.self).toFixed(1)}`,
      percent: `${((todaysRecord.self / 24) * 100).toFixed(2)}`,
    },
    {
      label: "social",
      hrs: `${(+todaysRecord.social).toFixed(1)}`,
      percent: `${((todaysRecord.social / 24) * 100).toFixed(2)}`,
    },
    {
      label: "play",
      hrs: `${(+todaysRecord.play).toFixed(1)}`,
      percent: `${((todaysRecord.play / 24) * 100).toFixed(2)}`,
    },
    {
      label: "fitness",
      hrs: `${(+todaysRecord.fitness).toFixed(1)}`,
      percent: `${((todaysRecord.fitness / 24) * 100).toFixed(2)}`,
    },
    {
      label: "others",
      hrs: `${(+todaysRecord.others).toFixed(1)}`,
      percent: `${((todaysRecord.others / 24) * 100).toFixed(2)}`,
    },
  ];

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
              console.log("hey");
              setTodaysRecord((prevState) => ({
                ...prevState,
                [activity]:
                  prevState[activity] + Number(hours) + Number(minutes / 60),
              }));
            }}
          />
          <Button
            label="Subtract"
            className="add-page__button"
            onClick={() => {
              console.log("hey");
              setTodaysRecord((prevState) => ({
                ...prevState,
                [activity]:
                  prevState[activity] - Number(hours) - Number(minutes / 60),
              }));
            }}
          />
        </div>
      </div>

      <div className="add-page__visuals">
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
        {/* <div
          id="add-page-chart"
          className="add-page-visual"
        ></div> */}
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
