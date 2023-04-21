const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userController = {
  register: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      // checks for pw length
      if (password.length < 6)
        return res.status(400).json({
          success: false,
          message: "Password must be 6 characters or more",
        });

      // checking if email already exists
      // checking if username was already taken
      const emailLowerCase = email.toLowerCase();
      const usernameLowerCase = username.toLowerCase();
      const existedUser = await User.findOne({
        $or: [{ email: emailLowerCase }, { username: usernameLowerCase }],
      });

      if (existedUser) {
        if (existedUser.email === emailLowerCase) {
          return res.status(400).json({
            success: false,
            message: "User already exists with this email address",
          });
        } else if (existedUser.username === usernameLowerCase) {
          return res.status(400).json({
            success: false,
            message: "Username already taken",
          });
        }
      }

      // hashing and storing the password
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name: name,
        username: usernameLowerCase,
        email: emailLowerCase,
        password: hashedPassword,
        photoURL: "",
        time_created: new Date(),
        last_modified: new Date(),
        settings: [],
        isActive: true,
      });
      const { _id: id, photoURL } = user;
      const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({
        success: true,
        result: { id, name, email: user.email, photoURL, token },
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Try again later",
      });
    }
  },
};

module.exports = userController;
