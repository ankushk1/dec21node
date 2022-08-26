const mongoose = require("mongoose");
const db = require("../config/mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema)

// db.users.find
// User.find()

module.exports = User;