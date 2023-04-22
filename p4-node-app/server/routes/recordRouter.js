const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const recordController = require("../controllers/record");

console.log("from recordRouter");
router.post("", auth, recordController.saveRecord);
router.get("", auth, recordController.getRecord);
router.put("", auth, recordController.updateRecord);
router.delete("", auth, recordController.deleteRecord);

module.exports = router;
