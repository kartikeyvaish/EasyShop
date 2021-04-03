const mongoose = require("mongoose");

const Products = mongoose.model(
  "Products",
  new mongoose.Schema({
    Title: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    Stock: {
      type: String,
      required: true,
    },
    AvailableAt: {
      type: Array,
      default: [],
    },
    Price: {
      type: String,
      required: true,
    },
    Files: {
      type: Array,
      default: [],
    },
    Colors: {
      type: Array,
      default: [],
    },
    Highlights: {
      type: String,
      default: "",
    },
  })
);

exports.Products = Products;
