const express = require("express");
const {createStaff, findAllStaff, updateStaff, deleteStaff, findOneStaff} = require("../controllers/staff.controller");
const router = express.Router();

router.route("/staff/new").post(createStaff);
router.route("/staffs").get(findAllStaff)
router.route("/staff/:id").put(updateStaff).delete(deleteStaff).get(findOneStaff)

module.exports = router;