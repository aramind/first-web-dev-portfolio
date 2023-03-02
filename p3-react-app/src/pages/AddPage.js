import "./AddPage.css";
import React from "react";
import AddPageInputForm from "../components/AddPageInputForm";
import DropdownList from "../components/DropdownList";
import Button from "../components/Button";
import TableDetail from "../components/TableDetail";

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

  const tds = [
    { label: "sleep", hrs: 5, percent: 3 },
    { label: "word", hrs: 4.5, percent: 13 },
    { label: "learn", hrs: 11, percent: 23 },
    { label: "self", hrs: 3, percent: 5 },
    { label: "social", hrs: 2.5, percent: 10 },
    { label: "play", hrs: 0, percent: 5 },
    { label: "h&fitness", hrs: 1, percent: 2 },
    { label: "others", hrs: 1, percent: 1 },
  ];
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
          <Button
            label="Add"
            className="add-page__button"
          />
          <Button
            label="Subtract"
            className="add-page__button"
          />
          <Button
            label="Clear"
            className="add-page__button"
          />
        </div>
      </div>

      <div className="add-page__visuals">
        <div
          id="add-page-table"
          className="add-page-visual"
        >
          <p className="table-title">Summary for Today</p>
          <div className="table-head">
            <p>Activity</p>
            <p>Total (hrs)</p>
            <p>% of the Day</p>
          </div>
          <div className="table-details">
            {tds.map((e, index) => (
              <TableDetail
                key={index}
                label={e.label}
                hrs={e.hrs}
                percent={e.percent}
              />
            ))}
          </div>
        </div>

        <div
          id="add-page-table"
          className="add-page-visual"
        >
          <p className="table-title">Summary for Today</p>
          <div className="table-head">
            <p>Activity</p>
            <p>Total (hrs)</p>
            <p>% of the Day</p>
          </div>
          <div className="table-details">
            {tds.map((e, index) => (
              <TableDetail
                key={index}
                label={e.label}
                hrs={e.hrs}
                percent={e.percent}
              />
            ))}
          </div>
        </div>
        {/* <div
          id="add-page-chart"
          className="add-page-visual"
        ></div> */}
      </div>

      <div className="add-page__status">
        <p>Remaining Time : 5.5 hrs</p>
      </div>

      <div className="add-page__controls">
        <Button
          label="Save Record"
          className="add-page__control add-page__control--save"
        />
        <Button
          label="Clear"
          className="add-page__control add-page__control--clear"
        />
      </div>
    </div>
  );
};

export default AddPage;
