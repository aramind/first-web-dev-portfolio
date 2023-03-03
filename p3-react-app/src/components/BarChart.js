import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import "./Charts.css";

const BarChart = ({ todaysRecord }) => {
  const [data, setData] = useState({
    labels: Object.keys(todaysRecord),
    datasets: [
      {
        label: "time",
        data: [],
        backgroundColor: [
          "#0a0908",
          "#a4161a",
          "#ffea00",
          "#7b2cbf",
          "#0077b6",
          "#fb6107",
          "#588157",
          "#abc4ff",
        ],
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: Object.keys(todaysRecord),
      datasets: [
        {
          label: "time",
          data: Object.values(todaysRecord).map((e) => Number(e)),
          backgroundColor: [
            "#0a0908",
            "#a4161a",
            "#ffea00",
            "#7b2cbf",
            "#0077b6",
            "#fb6107",
            "#588157",
            "#0fa3b1",
          ],
        },
      ],
    });
  }, [todaysRecord]);

  const options = {
    mainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div id="barChart">
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;
