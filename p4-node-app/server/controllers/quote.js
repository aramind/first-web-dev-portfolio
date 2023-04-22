const Quote = require("../models/Quote");
const handleError = require("./utils/errorCatchers");

const quoteController = {
  getRandomQuote: async (req, res) => {
    try {
      console.log("hehe");
      const total = await Quote.countDocuments({});
      const randomIndex = Math.floor(Math.random() * total);
      const randomQuote = await Quote.findOne().skip(randomIndex);
      // result
      console.log(randomQuote);
      res.status(200).json({
        success: true,
        message: "A random quote successfully retrieved",
        randomQuote,
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = quoteController;
