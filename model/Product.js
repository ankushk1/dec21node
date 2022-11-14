const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema)

module.exports = Product;