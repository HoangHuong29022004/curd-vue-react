const express = require("express");
const {createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct} = require("../controllers/product.controller");
const router = express.Router();

router.route("/product/new").post(createProduct);
router.route("/products").get(findAllProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(findOneProduct)

module.exports = router;