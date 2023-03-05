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
  const [numCharts, setNumCharts] = useState(1);

  const handleRemoveChart = (index) => removeChart(index);

  const [chartComponents, setChartComponents] = useState([
    <ChartDisplay onClose={() => handleRemoveChart(0)} />,
  ]);

  const addChart = () => {
    if (numCharts < 366) {
      const newChartComponents = [
        ...chartComponents,
        <ChartDisplay
          onClose={() => handleRemoveChart(newChartComponents.length - 1)}
        />,
      ];
      setChartComponents(newChartComponents);
      setNumCharts((prevNum) => prevNum + 1);
    }
  };

  const removeChart = (indexToRemove) => {
    const newChartComponents = chartComponents.filter(
      (_, index) => index !== indexToRemove
    );
    setChartComponents(newChartComponents);
    setNumCharts((prevNum) => prevNum - 1);
  };

  return (
    <div className="page page--chart">
      <div className="charts-container">
        {chartComponents.map((chartComponent, index) => (
          <div key={index}>{chartComponent}</div>
        ))}
        <button onClick={addChart}>Add Chart</button>
      </div>
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
