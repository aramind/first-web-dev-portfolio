import "./SummaryPage.css";
import React from "react";
import SummaryCard from "../components/SummaryCard";

const SummaryPage = () => {
  return (
    <div className="page page--summary">
      <div className="page--summary__user-info">
        <div className="card__user-info">
          <p className="card__greet">Hi User!</p>
          <p className="card__greet--subtext">Here is your summary...</p>
        </div>

        {/* <div className="card__user-info--subcard"></div> */}

        <div className="card__options">
          <button className="card__option">Daily</button>
          <button className="card__option">Weekly</button>
          <button className="card__option">Monthly</button>
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
