const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Record = require("../models/Record");

const recordsController = {
  register: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Try again later",
      });
    }
  },
};

module.exports = recordsController;
