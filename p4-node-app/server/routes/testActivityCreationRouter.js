const express = require("express");
const router = express.Router();
const testActivityCreationController = require("../controllers/testActivityCreation");

router.post("/", testActivityCreationController.createActivity);

module.exports = router;
