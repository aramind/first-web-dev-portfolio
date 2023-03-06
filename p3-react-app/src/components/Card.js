import "./Card.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Card = ({ logs, category, startDate, setStartDate, range }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [averageHours, setAverageHours] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [totalHoursPrev, setTotalHoursPrev] = useState(0);
  const [averageHoursPrev, setAverageHoursPrev] = useState(0);
  const [percentagePrev, setPercentagePrev] = useState(0);

  const getRangeNumber = (range) => {
    switch (range) {
      case "week":
        return 7;
      case "month":
        return 30;
      case "quarter":
        return 90;
      default:
        return 7;
    }
  };

  useEffect(() => {
    const daysAgoInRange = new Date(
      startDate.getTime() - getRangeNumber(range) * 24 * 60 * 60 * 1000
    );

    let total = 0;
    let count = 0;
    logs.forEach((log) => {
      const date = new Date(log.date);
      if (date >= daysAgoInRange && date <= startDate) {
        log.activities.forEach((activity) => {
          if (activity.name === category) {
            total += activity.hours;
            count++;
          }
        });
      }
    });

    const average = count > 0 ? total / count : 0;
    const totalHoursInRange = 24 * getRangeNumber(range);
    const percentage = total > 0 ? (total / totalHoursInRange) * 100 : 0;

    setTotalHours(total);
    setAverageHours(average);
    setPercentage(percentage);

    //

    const daysAgoInRangePrev = new Date(
      startDate.getTime() - 2 * getRangeNumber(range) * 24 * 60 * 60 * 1000
    );

    let totalPrev = 0;
    let countPrev = 0;
    logs.forEach((log) => {
      const date = new Date(log.date);
      if (date >= daysAgoInRangePrev && date <= daysAgoInRange) {
        log.activities.forEach((activity) => {
          if (activity.name === category) {
            totalPrev += activity.hours;
            countPrev++;
          }
        });
      }
    });

    const averagePrev = countPrev > 0 ? totalPrev / countPrev : 0;
    const percentagePrev =
      totalPrev > 0 ? (totalPrev / totalHoursInRange) * 100 : 0;

    setTotalHours(total);
    setAverageHours(average);
    setPercentage(percentage);
    setTotalHoursPrev(totalPrev);
    setAverageHoursPrev(averagePrev);
    setPercentagePrev(percentagePrev);
  }, [startDate, logs, category, range]);

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
        Prev. {range}: {totalHoursPrev.toFixed(1)} -{" "}
        {averageHoursPrev.toFixed(1)} - {percentagePrev.toFixed(1)}%
      </div>
    </div>
  );
};

export default Card;
