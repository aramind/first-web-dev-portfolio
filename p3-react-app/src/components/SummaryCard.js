import "./SummaryCard.css";
import React from "react";

const fetchDummyRandomData = (n) => Math.floor(Math.random() * n) + 1;

const SummaryCard = ({ label, range }) => {
  return (
    <div className="card">
      <div className="card__head">
        <p className="card__title">{label}</p>
        {/* <p className="card__dots">. . .</p> */}
      </div>
      <div className="card__values">
        <p className="card__value">{fetchDummyRandomData(20)}</p>
        <p className="card__value">{fetchDummyRandomData(20)}</p>
        <p className="card__value">{fetchDummyRandomData(45)}</p>
      </div>
      <div className="card__labels">
        <p className="card__label">Tot. (hrs)</p>
        <p className="card__label">Ave. (hrs)</p>
        <p className="card__label">%</p>
      </div>
      <div className="card_previous">
        Prev/ {range} - {fetchDummyRandomData(24)} -{fetchDummyRandomData(15)} -{" "}
        {fetchDummyRandomData(50)}%
      </div>
    </div>
  );
};

export default SummaryCard;
