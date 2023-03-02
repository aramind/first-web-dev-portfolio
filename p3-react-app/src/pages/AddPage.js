import "./AddPage.css";
import React from "react";
import AddPageInputForm from "../components/AddPageInputForm";
import DropdownList from "../components/DropdownList";
import Button from "../components/Button";

const AddPage = () => {
  const options = [
    { value: "sleep", label: "sleep" },
    { value: "work", label: "work" },
    { value: "learn", label: "learn" },
    { value: "self", label: "self" },
    { value: "social", label: "social" },
    { value: "play", label: "play" },
    { value: "h&fitness", label: "h&fitness" },
    { value: "others", label: "others" },
  ];

  const handleSelect = (value) => {
    console.log(`You selected ${value.value}`);
  };

  return (
    <div className="page add-page">
      <div className="add-page__inputs">
        <DropdownList
          placeHolder="Select..."
          options={options}
          onChange={(value) => handleSelect(value)}
        />

        <AddPageInputForm
          className="add-page__input input--hr"
          max={24}
          label="hrs and"
        />
        <AddPageInputForm
          className="add-page__input input--min"
          max={60}
          label="mins"
        />

        <div className="add-page__buttons">
          <Button label="Add" />
          <Button label="Subtract" />
          <Button label="Clear" />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
