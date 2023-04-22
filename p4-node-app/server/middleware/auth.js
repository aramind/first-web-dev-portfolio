const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    // verify using jwt token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name, username, photoURL } = decodedToken;
    req.user = { id, name, username, photoURL };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something is wrong with your authorization",
    });
  }
};

module.exports = auth;
