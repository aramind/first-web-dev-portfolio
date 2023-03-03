import { Pie } from "react-chartjs-2";
import React, { useState } from "react";

const PieChart = ({ data, options }) => {
  return (
    <Pie
      data={data}
      options={options}
    />
  );
};

export default PieChart;
