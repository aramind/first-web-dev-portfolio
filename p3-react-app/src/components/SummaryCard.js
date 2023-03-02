import "./SummaryCard.css";
import React from "react";

const SummaryCard = () => {
  return (
    <div className="card">
      <div className="card__head">
        <p className="card__title">Work</p>
        {/* <p className="card__dots">. . .</p> */}
      </div>
      <div className="card__values">
        <p className="card__value">10</p>
        <p className="card__value">8.5</p>
        <p className="card__value">24</p>
      </div>
      <div className="card__labels">
        <p className="card__label">Tot. (hrs)</p>
        <p className="card__label">Ave. (hrs)</p>
        <p className="card__label">%</p>
      </div>
      <div className="card_previous">Last week - 121 - 8 -20%</div>
    </div>
  );
};

export default SummaryCard;
