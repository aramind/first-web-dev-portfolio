import React, { useState } from "react";
import PieChart from "../components/PieChart";
import "./ChartsPage.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import BarChart from "../components/BarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../contextprovider/DataContextProvider";
import ChartDisplay from "../components/ChartDisplay";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsPage = () => {
  return (
    <div className="page page--chart">
      <ChartDisplay />
      {/* UPGRADE TO PREMIUM PAGE */}
      {/* <div className="message">
        <p>Charting Features are available exclusively to Premium Users.</p>
        <p>Thank you for your understanding and support! ❤️</p>
        <button id="btn--upgrade">Upgrade to Premium</button>
      </div> */}
    </div>
  );
};

export default ChartsPage;
