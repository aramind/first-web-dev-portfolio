import React, { useEffect, useReducer } from "react";
import "./DropdownList.css";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_SHOW_MENU":
      return { ...state, showMenu: payload };
    case "SET_SELECTED_VALUE":
      return { ...state, selectedValue: payload };
    default:
      return state;
  }
};

const DropdownList = ({ placeHolder, options, onChange }) => {
  const [state, dispatch] = useReducer(reducer, {
    showMenu: false,
    selectedValue: null,
  });

  useEffect(() => {
    const handler = () => dispatch({ type: "SET_SHOW_MENU", payload: false });

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e) => {
    e.stopPropagation();
    dispatch({ type: "SET_SHOW_MENU", payload: !state.showMenu });
  };

  const getDisplay = () => {
    if (state.selectedValue) {
      return state.selectedValue.label;
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    dispatch({ type: "SET_SELECTED_VALUE", payload: option });
    dispatch({ type: "SET_SHOW_MENU", payload: false });
    onChange(option);
  };

  const isSelected = (option) => {
    if (!state.selectedValue) {
      return false;
    }

    return state.selectedValue.value === option.value;
  };

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={handleInputClick}
      >
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">V</div>
        </div>
      </div>
      {state.showMenu && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              onClick={() => onItemClick(option)}
              className={`dropdown-item ${
                isSelected(option) ? "selected" : ""
              }`}
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
