const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById
} = require("../controller/productController");
const { validateJwt } = require("../middleware/jwt");
const router = express.Router();

router.post("/createProduct", validateJwt, createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:id", validateJwt, getProductById);

module.exports = router;
