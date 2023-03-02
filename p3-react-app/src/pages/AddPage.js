import React from "react";
import DropdownList from "../components/DropdownList";

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
    <div>
      <DropdownList
        placeHolder="Select..."
        options={options}
        onChange={(value) => handleSelect(value)}
      />
    </div>
  );
};

export default AddPage;
