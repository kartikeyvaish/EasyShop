const mongoose = require("mongoose");

const Invoices = mongoose.model(
  "Invoices",
  new mongoose.Schema({
    OrderID: {
      type: String,
      default: "",
    },
    URL: {
      type: String,
      default: "",
    },
  })
);

exports.Invoices = Invoices;
