const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controller/categoryController");
const { validateJwt } = require("../middleware/jwt");
const router = express.Router();

router.post("/createCategory", validateJwt, createCategory);
router.get("/getCategories", validateJwt, getCategories);
router.put("/updateCategory/:id", validateJwt, updateCategory);
router.delete("/deleteCategory/:id", validateJwt, deleteCategory);

module.exports = router;
