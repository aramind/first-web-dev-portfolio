import React, { useState, useEffect } from "react";
import "./DropdownList.css";
import down from "./";

const DropdownList = ({ placeHolder, options, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label;
    }
    return placeHolder;
  };

  // handles the selection from the dropdown list
  const onItemClick = (option) => {
    setSelectedValue(option);
    setShowMenu(false);
    onChange(option);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={handleInputClick}
      >
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">arrDown</div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              onClick={() => onItemClick(option)}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
              key={`${option.value}-${index}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownList;
