const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    // find return arr of data and findOne return one obj or data
    // arr >> filter -> Array of filtered data
    // arr >> find ->  filtered data elem/obj

    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }
    // const newProductCreated = await Product.create(req.body)
    // return res.status(200).json({productData : newProductCreated,  message: "Product created"})
    await Product.create(req.body);
    // const data = new Product(req.body);
    // data.save();

    return res.status(200).json({
      message: "Product created"
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
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
