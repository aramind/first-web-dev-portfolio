import "./SummaryPage.css";
import React, { useContext, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import Card from "../components/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../contextprovider/DataContextProvider";

const SummaryPage = () => {
  // from context provider(s)
  const { pastRecords, setPastRecords } = useContext(DataContext);

  // Get a unique list of activity categories
  const categories = pastRecords.reduce((acc, log) => {
    log.activities.forEach((activity) => {
      if (!acc.includes(activity.name.toUpperCase())) {
        acc.push(activity.name);
      }
    });
    return acc;
  }, []);

  console.log(categories);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="page page--summary">
      <div className="page--summary__user-info">
        <div className="card__user-info">
          <p className="card__greet">Hi User!</p>
          <p className="card__greet--subtext">Here is your summary...</p>
        </div>

        {/* <div className="card__user-info--subcard"></div> */}

        <div className="card__options">
          <button
            className="card__option"
            // onClick={handleDisplayDaily}
          >
            Daily
          </button>
          <button
            className="card__option"
            // onClick={handleDisplayWeekly}
          >
            Weekly
          </button>
          <button
            className="card__option"
            // onClick={handleDisplayMonthly}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="page--summary__cards">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        {categories.map((category) => (
          <Card
            key={category}
            logs={pastRecords}
            category={category}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;
