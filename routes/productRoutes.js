const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deactivateProduct,
  updateQuantityByNumber
} = require("../controller/productController");
const { validateJwt } = require("../middleware/jwt");
const router = express.Router();

router.post("/createProduct", validateJwt, createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:id", validateJwt, getProductById);
router.put("/updateProduct/:id", validateJwt, updateProduct);
router.put("/deactivateProduct/:id", validateJwt, deactivateProduct);
router.put("/updateQuantityByNumber/:id", validateJwt, updateQuantityByNumber);
router.delete("/deleteProduct/:id", validateJwt, deleteProduct);

module.exports = router;
