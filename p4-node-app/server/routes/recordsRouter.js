const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/:username/:label", auth, recordsController.saveRecord);
router.get("/:username/:label", auth, recordsController.getRecord);
router.put("/:username/:label", auth, recordsController.updateRecord);
router.delete("/:username/:label", auth, recordsController.deleteRecord);

module.exports = router;
