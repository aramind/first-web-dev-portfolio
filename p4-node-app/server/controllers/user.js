const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const handleError = require("./utils/errorCatchers");

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
      const token = jwt.sign(
        { id, name, username, photoURL },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        success: true,
        result: { id, name, username, email: user.email, photoURL, token },
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // checking if email already exists
      // checking if username was already taken
      const emailLowerCase = email.toLowerCase();
      const existedUser = await User.findOne({ email: emailLowerCase });

      if (!existedUser) {
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      // hashing and storing the password
      const correctPassword = await bcrypt.compare(
        password,
        existedUser.password
      );

      if (!correctPassword) {
        res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        const { _id: id, name, username, photoURL } = existedUser;
        const token = jwt.sign(
          { id, name, username, photoURL },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          success: true,
          result: {
            id,
            name,
            username,
            email: emailLowerCase,
            photoURL,
            token,
          },
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  // UPDATING PROFILE
  updateProfile: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { ...req.body, last_modified: new Date() },
        {
          new: true,
        }
      );
      const { _id: id, name, username, photoURL } = updatedUser;

      const token = jwt.sign(
        { id, name, username, photoURL },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ success: true, result: { name, username, photoURL, token } });
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = userController;
