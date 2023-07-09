const express = require("express");
// controller functions
const {
  getAllProducts,
  getSingleProductsStatic,
  practice
} = require("../controllers/products");
// setup router
const router = express.Router();
// Routes
router.route("/").get(getAllProducts)
router.route("/static").get(getSingleProductsStatic)
router.route('/practice').get(practice)
module.exports = router;
