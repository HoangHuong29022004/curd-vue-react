const express = require("express");
const {createShift, findAllShift, updateShift, deleteShift, findOneShift} = require("../controllers/shift.controller");
const router = express.Router();

router.route("/shift/new").post(createShift);
router.route("/shifts").get(findAllShift)
router.route("/shift/:id").put(updateShift).delete(deleteShift).get(findOneShift)

module.exports = router;