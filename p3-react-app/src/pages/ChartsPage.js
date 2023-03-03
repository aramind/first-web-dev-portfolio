import React, { useState } from "react";
import "./ChartsPage.css";

const ChartsPage = () => {
  return (
    <div className="page page--chart">
      <div className="message">
        <p>Charting Features are available exclusively to Premium Users.</p>
        <p>Thank you for your understanding and support! ❤️</p>
        <button id="btn--upgrade">Upgrade to Premium</button>
      </div>
    </div>
  );
};

export default ChartsPage;
