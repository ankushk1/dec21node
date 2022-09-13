const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    // find return arr of data and findOne return one obj or data
    // arr >> filter -> Array of filtered data
    // arr >> find ->  filtered data elem/obj
    //1. Express validator
    //2. We can add validations in FE only

    // if (!req.body.name || !req.body.description) {
    //   return res.status(400).json({ message: "Required fields missing" });
    // }

    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }
    // const newProductCreated = await Product.create(req.body)
    // return res.status(200).json({productData : newProductCreated,  message: "Product created"})
    await Product.create({ ...req.body, created_by: req.body.userId });
    // const data = new Product(req.body);
    // data.save();

    return res.status(200).json({
      message: "Product created"
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category", "name categoryType")
      .populate("created_by", "firstname email")
      .populate("updated_by", "firstname email")
    // finding obj based on ID and then add the whole obj in that key

    // if(!products.length ){
    if (products.length < 1) {
      return res.status(400).json({ message: "No Products found" });
    }

    return res.status(200).json({
      productsData: products,
      message: "Products fetched Successfully"
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product Not found" });
    }
    return res.status(200).json({
      product: product,
      message: "Product fetched Successfully"
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productUpdated = await Product.findByIdAndUpdate(id, {
      ...req.body,
      updated_by: req.body.userID
    });
    if (!productUpdated) {
      return res
        .status(400)
        .json({ message: "Error updating product/Invalid Id" });
    }
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted) {
      return res
        .status(400)
        .json({ message: "Error deleting product/Invalid Id" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productUpdated = await Product.findByIdAndUpdate(id, {
      isActive: false
    });
    if (!productUpdated) {
      return res
        .status(400)
        .json({ message: "Error deactivating product/Invalid Id" });
    }
    return res
      .status(200)
      .json({ message: "Product deactivated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.updateQuantityByNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const productUpdated = await Product.findByIdAndUpdate(id, {
      $inc: { quantity: req.body.num }
    });
    if (!productUpdated) {
      return res
        .status(400)
        .json({ message: "Error updating quantity/Invalid Id" });
    }
    return res.status(200).json({ message: "Quantity updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};
