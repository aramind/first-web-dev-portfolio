import "./AddPageInputForm.css";
import React from "react";

const AddPageInputForm = ({ max, className, label, value, onChange }) => {
  return (
    <div className="add-page-input-form">
      <input
        className={className}
        type="number"
        min="0"
        max={max}
        value={value}
        onChange={onChange}
      />
      <label className="add-page-input-form__label">&nbsp;&nbsp;{label}</label>
    </div>
  );
};

export default AddPageInputForm;
