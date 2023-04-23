const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Record = require("../models/Record");
const handleError = require("./utils/errorCatchers");

const summaryController = {
  getSummary: async (req, res) => {
    try {
      // get the user id from the decoded token
      const { id } = req.user;

      // get the start and end dates from the query params
      const { from, to } = req.query;

      // console.log("TO/FROM", to + "/" + from);
      // console.log(new Date(from).toString());
      // console.log(new Date(to).toString());
      // check if the start date is earlier than the end date
      if (new Date(from) >= new Date(to)) {
        return res.status(400).json({
          success: false,
          message: "Start date must be earlier than end date",
        });
      } else if (new Date(from).toString() === new Date(to).toString()) {
        return res.status(400).json({
          success: false,
          message: "Start date and end date must be different",
        });
      }
      // find all the records of the user between the specified dates
      const records = await Record.find({
        owner: id,
        date: { $gte: new Date(from), $lte: new Date(to) },
      });
      // calculate the total hours spent on each activity and the total number of hours

      let totalHours = 0;
      const activityTotals = {};
      records.forEach((record) => {
        record.activities.forEach((activity) => {
          if (activity.name in activityTotals) {
            activityTotals[activity.name] += parseFloat(activity.hours_spent);
          } else {
            activityTotals[activity.name] = parseFloat(activity.hours_spent);
          }
          totalHours += parseFloat(activity.hours_spent);
        });
      });

      // return the documents
      res.status(200).json({
        success: true,
        message: "Summary retrieved",
        summary: {
          from,
          to,
          total_hours: totalHours,
          activity_totals: activityTotals,
        },
      });
    } catch (error) {
      handleError(res, error);
    }
  },
  //get summary by interval
  getSummaryInterval: async (req, res) => {
    try {
      // get the user id from the decoded token
      const { id } = req.user;

      // get the reference date and interval from the query params
      const { ref: referenceDate, interval } = req.query;

      // calculate the start and end dates
      const days = +interval;
      const startDate = new Date(referenceDate);
      const endDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - (days - 1));

      // find all the records fo the user between the dates
      const records = await Record.find({
        owner: id,
        date: { $gte: startDate, $lte: endDate },
      });

      // calculate the total hours spent on each activity and the total number of hours on the interval
      let totalHours = 0;
      const activityTotals = {};
      records.forEach((record) => {
        record.activities.forEach((act) => {
          if (act.name in activityTotals) {
            activityTotals[act.name] += parseFloat(act.hours_spent);
          } else {
            activityTotals[act.name] = parseFloat(act.hours_spent);
          }
          totalHours += parseFloat(act.hours_spent);
        });
      });
      // calculate the averages
      const activityAverages = {};
      Object.entries(activityTotals).forEach(([name, hours]) => {
        activityAverages[name] = (hours / days).toFixed(2);
      });

      // calculate the precentage of each activity to the total number of hours
      const activityPercentages = {};
      Object.entries(activityTotals).forEach(([name, hours]) => {
        activityPercentages[name] = ((hours / totalHours) * 100).toFixed(2);
      });

      // find the previous interval

      const previousStartDate = new Date(startDate);
      const previousEndDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - days);
      previousEndDate.setDate(previousEndDate.getDate() - 1);

      // find all the records of the user between the prev start and end
      const previousRecords = await Record.find({
        owner: id,
        date: { $gte: previousStartDate, $lte: previousEndDate },
      });

      // calculate the total hrs spent on each
      let prevTotalHours = 0;
      const prevActivityTotals = {};
      previousRecords.forEach((record) => {
        record.activities.forEach((act) => {
          if (act.name in prevActivityTotals) {
            prevActivityTotals[act.name] += parseFloat(act.hours_spent);
          } else {
            prevActivityTotals[act.name] = parseFloat(act.hours_spent);
          }
          prevTotalHours += parseFloat(act.hours_spent);
        });
      });

      // calculate the averages
      const prevActivityAverages = {};
      Object.entries(prevActivityTotals).forEach(([name, hours]) => {
        prevActivityAverages[name] = (hours / days).toFixed(2);
      });

      // calculate the precentage of each activity to the total number of hours
      const prevActivityPercentages = {};
      Object.entries(prevActivityTotals).forEach(([name, hours]) => {
        prevActivityPercentages[name] = ((hours / totalHours) * 100).toFixed(2);
      });

      // output
      res.status(200).json({
        success: true,
        message: "Successfully computed",
        summaryInterval: {
          startDate,
          endDate,
          totalHours,
          activityAverages,
          activityPercentages,
          previousStartDate,
          previousEndDate,
          prevTotalHours,
          prevActivityAverages,
          prevActivityPercentages,
        },
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = summaryController;