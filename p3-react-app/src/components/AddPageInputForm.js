import "./AddPageInputForm.css";
import React from "react";

const AddPageInputForm = ({ max, className }) => {
  return (
    <input
      className={className}
      type="number"
      min="0"
      max={max}
    />
  );
};

export default AddPageInputForm;
