const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Record = require("../models/Record");
const handleError = require("./utils/errorCatchers");

// * Controller for any record-related action/requests

// * (1) saveRecord
// * - will handle the creation(if not yet existing),
// *   and updating of a record given date
// * - for the end point POST | record/:label
// *   example: record/2023-04-12
// * (2) getRecord
// * - will handle the retrieval of record from db based on date sent as :label,
// * - for the end point GET | record/:label
// *   example: record/2023-04-22
// * (3) deleteRecord
// * - will handle the deletion of record from db based on date sent as :label,
// * - for the end point DELETE | record/:label
// *   example: record/2023-04-22
// * (4) resetRecord
// * - will handle the resetting of time spend on each activities on date specified and sent as :label,
// * - for the end point PUT | record/:label
// *   example: record/2023-04-22
const recordController = {
  // * (1) saveRecord
  saveRecord: async (req, res) => {
    try {
      // * extracting data from req
      // console.log("called POST /:label from FE");
      const { label } = req.params;
      const { name, seconds_spent } = req.body;
      const owner = req.user.id;

      // * Find existing record for the given label
      const existingRecord = await Record.findOne({
        label: `${owner}@${label}`,
        owner,
      });

      if (existingRecord) {
        console.log("EXISTEDDDDDDDDDDDDDDDDD");
        // * Check if the addition/subtraction will result to
        // * total hrs > 24 or a negative value
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

        // * Update existing activity or add new activity
        const activityIndex = existingRecord.activities.findIndex(
          (activity) => activity.name === name
        );
        if (activityIndex === -1) {
          existingRecord.activities.push({ name, seconds_spent });
        } else {
          existingRecord.activities[activityIndex].seconds_spent =
            Number(existingRecord.activities[activityIndex].seconds_spent) +
            Number(seconds_spent);
        }
        existingRecord.last_modified = new Date();

        const updatedRecord = await existingRecord.save();
        res.status(200).json({
          success: true,
          message: "Record updated",
          result: updatedRecord,
        });
      } else {
        if (Number(seconds_spent) > 86400) {
          res.status(400).json({
            success: false,
            message: "Hours spent cannot be greater than 24",
            result: null,
          });
          return;
        }

        // Create a new record
        const newRecord = new Record({
          label: `${owner}@${label}`,
          date: `${label}@${owner}`,
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
        date: `${label}@${owner}`,
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

  // * (2) getRecord
  getRecord: async (req, res) => {
    // console.log("called GET /:label from FE");
    try {
      // * get the infos from req
      const { id } = req.user;
      const { label } = req.params;

      // * find the record from the DB given label and owner Id
      const record = await Record.findOne({
        label: `${id}@${label}`,
        owner: id,
      });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "No record created for the selected date.",
          result: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Record retrieved",
        result: record,
      });
      // * result
    } catch (error) {
      handleError(res, error);
    }
  },

  // * (3) deleteRecord
  deleteRecord: async (req, res) => {
    console.log("called DELETE /:label from FE");
    try {
      /// * get the infos from req
      const { id } = req.user;
      const { label } = req.params;

      // * delete the record from the DB given label and owner ID
      const deletedRecord = await Record.findOneAndDelete({
        label: `${id}@${label}`,
        owner: id,
      });

      res.status(200).json({
        success: true,
        message: "Record deleted",
        result: deletedRecord,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // * (4) resetRecord
  resetRecord: async (req, res) => {
    try {
      // console.log("called PUT /:label from FE");
      // * extract infos from req
      const { label } = req.params;
      const owner = req.user.id;

      // * Find existing record for the given label and resetting seconds_spent field to 0 for each
      const existingRecord = await Record.findOne({
        label: `${owner}@${label}`,
        owner,
      });

      if (existingRecord) {
        existingRecord.activities.forEach((activity) => {
          activity.seconds_spent = 0;
        });
        existingRecord.last_modified = new Date();
        const updatedRecord = await existingRecord.save();

        // * returning result
        return res.status(200).json({
          success: true,
          message: "Reset successful",
          result: updatedRecord,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Reset can't be done for non-existing record",
          result: null,
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = recordController;
