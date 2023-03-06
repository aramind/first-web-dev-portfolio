import "./SummaryCard.css";
import React from "react";

const SummaryCard = ({ label, range }) => {
  return (
    <div className="card">
      <div className="card__head">
        <p className="card__title">{label}</p>
        {/* <p className="card__dots">. . .</p> */}
      </div>
      <div className="card__values">
        <p className="card__value">10</p>
        <p className="card__value">10</p>
        <p className="card__value">10</p>
      </div>
      <div className="card__labels">
        <p className="card__label">Tot. (hrs)</p>
        <p className="card__label">Ave. (hrs)</p>
        <p className="card__label">%</p>
      </div>
      <div className="card_previous"></div>
    </div>
  );
};

export default SummaryCard;
