const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const summaryController = require("../controllers/summary");

router.get("", auth, summaryController.getSummary);

module.exports = router;
