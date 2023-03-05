import React, { useContext, useState } from "react";
import "./ChartsPage.css";
import PieChart from "../components/PieChart";
import "./ChartsPage.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import BarChart from "../components/BarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../contextprovider/DataContextProvider";

const ChartDisplay = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { pastRecords, addRecord } = useContext(DataContext);
  console.log(pastRecords);

  const originalObject = {
    date: "2023-02-24",
    activities: [
      {
        name: "SLEEP",
        hours: 6,
      },
      {
        name: "WORK",
        hours: 7,
      },
      {
        name: "LEARN",
        hours: 4,
      },
      {
        name: "SELF",
        hours: 1,
      },
      {
        name: "SOCIAL",
        hours: 2,
      },
      {
        name: "PLAY",
        hours: 1,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 2,
      },
    ],
  };

  const transformedObject = originalObject.activities.reduce(
    (acc, curr) => {
      const { name, hours } = curr;
      const transformedKey = name.toLowerCase();
      acc[transformedKey] = hours;
      return acc;
    },
    {
      sleep: 0,
      work: 0,
      learn: 0,
      self: 0,
      social: 0,
      play: 0,
      fitness: 0,
      others: 0,
    }
  );

  console.log(transformedObject); // Output: {sleep: 6, work: 7, learn: 4, self: 1, social: 2, play: 1, fitness: 1, others: 2}

  return (
    <div className="chart-container">
      <div className="date-picker">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          id="date-picker-comp"
          style={{ borderRadius: "3px", height: "3rem" }}
        />
      </div>
      <div className="chart--pie">
        <PieChart todaysRecord={transformedObject} />
      </div>
      <div className="date-details">Mon, Mar 3, 2023</div>
      <div className="chart-summary">work(20%) sleep(15%)</div>
    </div>
  );
};

export default ChartDisplay;
