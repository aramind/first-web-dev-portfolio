import "./SummaryPage.css";
import React, { useState } from "react";
import SummaryCard from "../components/SummaryCard";

const labels = [
  "sleep",
  "work",
  "learn",
  "self",
  "social",
  "play",
  "h&fitness",
  "others",
];

const initialState = {
  dailySummary: [],
  weeklySummary: [],
  monthlySummary: [],
};

const SummaryPage = ({ records, setRecords }) => {
  const [range, setRange] = useState("");

  const handleDisplayDaily = () => {
    setRange("Day");
  };
  const handleDisplayWeekly = () => {
    setRange("Week");
  };
  const handleDisplayMonthly = () => {
    setRange("Month");
  };

  return (
    <div className="page page--summary">
      <div className="page--summary__user-info">
        <div className="card__user-info">
          <p className="card__greet">Hi User!</p>
          <p className="card__greet--subtext">Here is your summary...</p>
        </div>

        {/* <div className="card__user-info--subcard"></div> */}

        <div className="card__options">
          <button
            className="card__option"
            onClick={handleDisplayDaily}
          >
            Daily
          </button>
          <button
            className="card__option"
            onClick={handleDisplayWeekly}
          >
            Weekly
          </button>
          <button
            className="card__option"
            onClick={handleDisplayMonthly}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="page--summary__cards">
        {labels.map((label) => (
          <SummaryCard
            label={label}
            range={range}
          />
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;
