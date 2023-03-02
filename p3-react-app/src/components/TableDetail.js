import "./TableDetail.css";
import React from "react";

const TableDetail = ({ index, label, hrs, percent }) => {
  return (
    <div className="table-row">
      <p>{label}</p>
      <p>{hrs}</p>
      <p>{percent}%</p>
    </div>
  );
};

export default TableDetail;
