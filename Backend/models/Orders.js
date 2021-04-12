const mongoose = require("mongoose");

const Orders = mongoose.model(
  "Orders",
  new mongoose.Schema({
    Product: {
      type: Object,
      default: {},
    },
    Seller: {
      type: Object,
      default: {},
    },
    Quantity: {
      type: Number,
      default: 0,
    },
    Color: {
      type: Object,
      default: null,
    },
    PlacedBy: {
      type: String,
      default: "",
    },
    Price: {
      type: String,
      default: "",
    },
    DeliveryAddress: {
      type: Object,
      default: {},
    },
    Discount: {
      type: Number,
      default: 0,
    },
    DeliveryCharge: {
      type: Number,
      default: 0,
    },
    PaymentMode: {
      type: String,
      default: "",
    },
    OrderID: {
      type: String,
      default: "",
    },
    DateTime: {
      type: String,
      default: "",
    },
  })
);

exports.Orders = Orders;
