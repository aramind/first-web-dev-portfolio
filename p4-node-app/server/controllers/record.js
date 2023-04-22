const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Record = require("../models/Record");
const handleError = require("./utils/errorCatchers");

const recordController = {
  saveRecord: async (req, res) => {
    try {
      // extract the label, and activities from the body
      const { label, activities } = req.body;
      // extract the owner(user id) from the token
      const owner = req.user.id;

      console.log(req.body);
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
        // saveRecord,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // GET localhost:5000/record/
  getRecord: async (req, res) => {
    try {
      // get the user id from the decoded token
      const { id } = req.user;
      // get the label from the body
      const { label } = req.body;
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
        record,
      });
      // result
    } catch (error) {
      handleError(res, error);
    }
  },

  // DELETE localhost:5000/record/
  deleteRecord: async (req, res) => {
    try {
      // get the user id from the token
      const { id } = req.user;
      // get the label from the body
      const { label } = req.body;
      // delete the record from the DB given label and owner ID
      const deletedRecord = await Record.findOneAndDelete({ label, owner: id });

      res.status(200).json({
        success: true,
        message: "Record deleted",
        deletedRecord,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // PUT localhost:5000/record/
  updateRecord: async (req, res) => {
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
          record: updatedRecord,
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
          saveRecord,
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = recordController;
