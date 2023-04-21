const auth = async (req, res, next) => {
  try {
    // verify using jwt token

    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({
        success: false,
        message: "Something is wrong with your authorization",
      });
  }
};

module.exports = auth;
