const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const summaryController = require("../controllers/summary");

router.get("/between", auth, summaryController.getSummary);
router.get("/interval", auth, summaryController.getSummaryInterval);

module.exports = router;
