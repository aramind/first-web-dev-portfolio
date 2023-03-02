import "./SummaryPage.css";
import React, { useReducer } from "react";
import SummaryCard from "../components/SummaryCard";

const initialState = {
  dailySummary: [],
  weeklySummary: [],
  monthlySummary: [],
};

const reducer = (state, { type, payload }) => {};

const SummaryPage = ({ records, setRecords }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDisplayDaily = () => {};
  const handleDisplayWeekly = () => {};
  const handleDisplayMonthly = () => {};

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
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
      </div>
    </div>
  );
};

export default SummaryPage;
