const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Record = require("../models/Record");
const handleError = require("./utils/errorCatchers");

const summaryController = {
  // GET localhost:5000/record/
  getSummary: async (req, res) => {
    try {
      // get the user id from the decoded token
      const { id } = req.user;

      // get the start and end dates from the query params
      const { from, to } = req.query;

      console.log("TO/FROM", to + "/" + from);
      console.log(new Date(from).toString());
      console.log(new Date(to).toString());
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
};

module.exports = summaryController;
