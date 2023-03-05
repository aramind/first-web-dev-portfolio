import React, { useContext, useState } from "react";
// import "./ChartsPage.css";
import PieChart from "../components/PieChart";
// import "./ChartsPage.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import BarChart from "../components/BarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../contextprovider/DataContextProvider";
import { v4 as uuidv4 } from "uuid";

const ChartDisplay = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { pastRecords } = useContext(DataContext);

  const transformedObject = {
    sleep: 0,
    work: 0,
    learn: 0,
    self: 0,
    social: 0,
    play: 0,
    fitness: 0,
    others: 0,
  };

  // const records = JSON.parse(localStorage.getItem("records"));

  console.log("from chartDisplay");
  console.log(typeof pastRecords);
  console.log(pastRecords);

  const selectedRecord = pastRecords.find(
    (record) => record.date === selectedDate.toISOString().slice(0, 10)
  );

  if (selectedRecord) {
    selectedRecord.activities.forEach(({ name, hours }) => {
      const transformedKey = name.toLowerCase();
      transformedObject[transformedKey] = hours;
    });
    console.log(transformedObject);
  }

  const totalHrs = Object.values(transformedObject).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const percentageObject = {};
  for (const key in transformedObject) {
    const percentage = ((transformedObject[key] / totalHrs) * 100).toFixed(1);
    percentageObject[key] = percentage;
  }

  const summaryText = Object.entries(percentageObject)
    .map(([key, percentage]) => `${key}: ${percentage}%`)
    .join(", ");

  const dateDetails = selectedDate.toDateString();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="date-picker">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            id="date-picker-comp"
            style={{ borderRadius: "3px", height: "3rem" }}
          />
        </div>
        <button
          className="close-button"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="date-details">{dateDetails}</div>
      {selectedRecord ? (
        <React.Fragment>
          <div className="chart--pie">
            <PieChart todaysRecord={transformedObject} />
          </div>
          <div className="chart-summary">{summaryText}</div>
        </React.Fragment>
      ) : (
        <div>No data available for the selected date.</div>
      )}
    </div>
  );
};

export default ChartDisplay;
