const express = require("express");
const {createCategory, findAllCategory, deleteCategory} = require("../controllers/category.controller");
const router = express.Router();

router.route("/category/new").post(createCategory);
router.route("/categories").get(findAllCategory)
router.route("/category/:id").delete(deleteCategory)

module.exports = router;