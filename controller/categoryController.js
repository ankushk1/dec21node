const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    await Category.create(req.body);
    return res.status(200).json({ message: "Category created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = req.body.active
      ? await Category.find({ isActive: true })
      : await Category.find();
    if (!categories.length > 0) {
      return res.status(400).json({ message: "No categories found" });
    }
    return res
      .status(200)
      .json({
        categories: categories,
        message: "Categories fetched successfully"
      });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryUpdated = await Category.findByIdAndUpdate(id, req.body);
    if (!categoryUpdated) {
      return res
        .status(400)
        .json({ message: "Error updating Category/Invalid Id" });
    }
    return res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);
    if (!categoryDeleted) {
      return res
        .status(400)
        .json({ message: "Error deleting Category/Invalid Id" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

