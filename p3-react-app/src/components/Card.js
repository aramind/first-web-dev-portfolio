import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Card = ({ logs, category, startDate, setStartDate }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [averageHours, setAverageHours] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [totalHoursPrev, setTotalHoursPrev] = useState(0);
  const [averageHoursPrev, setAverageHoursPrev] = useState(0);
  const [percentagePrev, setPercentagePrev] = useState(0);

  useEffect(() => {
    const sevenDaysAgo = new Date(
      startDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    let total = 0;
    let count = 0;
    logs.forEach((log) => {
      const date = new Date(log.date);
      if (date >= sevenDaysAgo && date <= startDate) {
        log.activities.forEach((activity) => {
          if (activity.name === category) {
            total += activity.hours;
            count++;
          }
        });
      }
    });

    const average = count > 0 ? total / count : 0;
    const totalHoursInSevenDays = 24 * 7;
    const percentage = total > 0 ? (total / totalHoursInSevenDays) * 100 : 0;

    setTotalHours(total);
    setAverageHours(average);
    setPercentage(percentage);

    //

    const fourteenDaysAgo = new Date(
      startDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );

    let totalPrev = 0;
    let countPrev = 0;
    logs.forEach((log) => {
      const date = new Date(log.date);
      if (date >= fourteenDaysAgo && date <= sevenDaysAgo) {
        log.activities.forEach((activity) => {
          if (activity.name === category) {
            totalPrev += activity.hours;
            countPrev++;
          }
        });
      }
    });

    const averagePrev = countPrev > 0 ? totalPrev / countPrev : 0;
    const totalHoursIn14Days = 24 * 7;
    const percentagePrev =
      totalPrev > 0 ? (totalPrev / totalHoursIn14Days) * 100 : 0;

    setTotalHours(total);
    setAverageHours(average);
    setPercentage(percentage);
    setTotalHoursPrev(totalPrev);
    setAverageHoursPrev(averagePrev);
    setPercentagePrev(percentagePrev);
  }, [startDate, logs, category]);

  return (
    <div className="card">
      <div className="card__head">
        <p className="card__title">{category}</p>
        {/* <p className="card__dots">. . .</p> */}
      </div>
      <div className="card__values">
        <p className="card__value">{totalHours.toFixed(1)}</p>
        <p className="card__value">{averageHours.toFixed(1)}</p>
        <p className="card__value">{percentage.toFixed(1)}%</p>
      </div>
      <div className="card__labels">
        <p className="card__label">Tot. (hrs)</p>
        <p className="card__label">Ave. (hrs)</p>
        <p className="card__label">%</p>
      </div>
      <div className="card_previous">
        Last week: {totalHoursPrev.toFixed(1)} - {averageHoursPrev.toFixed(1)} -{" "}
        {percentagePrev.toFixed(1)}%
      </div>
    </div>
  );
};

export default Card;
