const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Record = require("../models/Record");
const handleError = require("./utils/errorCatchers");

const recordController = {
  saveRecord: async (req, res) => {
    try {
      console.log("called POST /:label from FE");
      const { label } = req.params;
      const { name, seconds_spent } = req.body;
      const owner = req.user.id;

      // Find existing record for the given label
      const existingRecord = await Record.findOne({ label, owner });

      if (existingRecord) {
        // Check if hours_spent exceeds 24
        const totalSecondsSpent = existingRecord.activities.reduce(
          (total, activity) => +total + +activity.seconds_spent,
          0
        );
        const newTotalSecondsSpent =
          parseInt(totalSecondsSpent) + parseInt(seconds_spent);

        if (newTotalSecondsSpent < 0) {
          res.status(400).json({
            success: false,
            message: "Total hours spent cannot be negative",
            result: null,
          });
          return;
        } else if (newTotalSecondsSpent > 86400) {
          res.status(400).json({
            success: false,
            message: "Total hours spent cannot exceed 24",
            result: null,
          });
          return;
        }

        // Update existing activity or add new activity
        const activityIndex = existingRecord.activities.findIndex(
          (activity) => activity.name === name
        );
        if (activityIndex === -1) {
          existingRecord.activities.push({ name, seconds_spent });
        } else {
          existingRecord.activities[activityIndex].seconds_spent =
            parseInt(existingRecord.activities[activityIndex].seconds_spent) +
            parseInt(seconds_spent);
        }
        existingRecord.last_modified = new Date();

        const updatedRecord = await existingRecord.save();
        res.status(200).json({
          success: true,
          message: "Record updated",
          result: updatedRecord,
        });
      } else {
        // Check if hours_spent exceeds 24
        if (parseInt(seconds_spent) > 86400) {
          res.status(400).json({
            success: false,
            message: "Hours spent cannot be greater than 24",
            result: null,
          });
          return;
        }

        // Create a new record
        const newRecord = new Record({
          label,
          date: new Date(label),
          owner,
          activities: [{ name, seconds_spent }],
          last_modified: new Date(),
        });
        const saveRecord = await newRecord.save();
        res.status(201).json({
          success: true,
          message: "New record saved",
          result: saveRecord,
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  },

  saveRecordOLD: async (req, res) => {
    try {
      console.log("called POST /:label from FE");
      // extract the label, and activities from the body
      const { label } = req.params;
      const { activities } = req.body;
      // extract the owner(user id) from the token
      const owner = req.user.id;

      // console.log(req.body);
      // Create activity objects
      const activityObjs = activities.map((act) => {
        return { name: act.name, hours_spent: act.hours_spent };
      });
      // create a record object
      const newRecord = new Record({
        label,
        date: new Date(label),
        owner,
        activities: activityObjs,
        last_modified: new Date(),
      });
      // save the record object to database
      const saveRecord = await newRecord.save();

      res.status(201).json({
        success: true,
        message: "New record saved",
        result: saveRecord,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // GET localhost:5000/record/:label
  getRecord: async (req, res) => {
    console.log("called GET /:label from FE");
    try {
      // get the user id from the decoded token
      const { id } = req.user;
      // get the label from the body
      const { label } = req.params;
      // find the record from the DB given label and owner Id
      const record = await Record.findOne({ label, owner: id });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "Record not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Record retrieved",
        result: record,
      });
      // result
    } catch (error) {
      handleError(res, error);
    }
  },

  // DELETE localhost:5000/record/:label
  deleteRecord: async (req, res) => {
    console.log("called DELETE /:label from FE");
    try {
      // get the user id from the token
      const { id } = req.user;
      // get the label from the body
      const { label } = req.params;
      // delete the record from the DB given label and owner ID
      const deletedRecord = await Record.findOneAndDelete({ label, owner: id });

      res.status(200).json({
        success: true,
        message: "Record deleted",
        result: deletedRecord,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // PUT localhost:5000/record/
  updateRecord: async (req, res) => {
    console.log("called UPDATE /:label from FE");
    try {
      // extract the label, and activities from the body
      const { label, activities } = req.body;
      // extract the owner(user id) from the token
      const owner = req.user.id;

      // check if record exists
      const existingRecord = await Record.findOne({ label, owner });

      // if record, exists, update its data
      if (existingRecord) {
        existingRecord.activities = activities.map((act) => {
          return { name: act.name, hours_spent: act.hours_spent };
        });
        existingRecord.last_modified = new Date();
        const updatedRecord = await existingRecord.save();
        return res.status(200).json({
          success: true,
          message: "Record successfully updated",
          result: updatedRecord,
        });
      } else {
        const activityObjs = activities.map((act) => {
          return { name: act.name, hours_spent: act.hours_spent };
        });
        // create a record object
        const newRecord = new Record({
          label,
          date: new Date(label),
          owner,
          activities: activityObjs,
          last_modified: new Date(),
        });
        // save the record object to database
        const saveRecord = await newRecord.save();

        res.status(201).json({
          success: true,
          message: "New record saved",
          result: saveRecord,
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = recordController;
