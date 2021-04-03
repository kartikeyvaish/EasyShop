const Joi = require("joi");
const mongoose = require("mongoose");

const AddressSchema = Joi.object({
  OwnerID: Joi.string().required(),
  Name: Joi.string().required(),
  Address: Joi.string().required(),
  City: Joi.string().required(),
  State: Joi.string().required(),
  Pincode: Joi.number().required(),
  Phone: Joi.string().required(),
  AddressType: Joi.string().required(),
}).options({ allowUnknown: true });

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      default: "",
    },
    Locality: {
      type: String,
      default: "",
    },
    City: {
      type: String,
      default: "",
    },
    State: {
      type: String,
      default: "",
    },
    Pincode: {
      type: Number,
      default: "",
    },
    Phone: {
      type: String,
      default: "",
    },
    Default: {
      type: Boolean,
      default: false,
    },
    AddressType: {
      type: String,
      default: "",
    },
    OwnerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  })
);

exports.Address = Address;
exports.AddressSchema = AddressSchema;
