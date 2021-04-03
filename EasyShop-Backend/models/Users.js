const mongoose = require("mongoose");
const Joi = require("joi");
const CurrentTime = require("../config/HelperFunctions.ts");

const RegisterSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().email().required(),
  Phone: Joi.string().required(),
  Password: Joi.string().required().min(6),
}).options({ allowUnknown: true });

const LoginSchema = Joi.object({
  Email: Joi.string().required(),
  Password: Joi.string().required(),
}).options({ allowUnknown: true });

const Users = mongoose.model(
  "Users",
  new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    ProfilePicture: {
      type: String,
      default: "Default Image URL",
    },
    Status: {
      type: String,
      default: "Offline",
    },
    Wishlist: {
      type: Array,
      default: [],
    },
    Cart: {
      type: Array,
      default: [],
    },
    LastSeen: { type: String, default: CurrentTime() },
    Email_Verified: {
      type: Boolean,
      default: false,
    },
    PushToken: {
      type: String,
      default: "",
    },
    Mode: {
      type: String,
      default: "light",
    },
    OTP: {
      type: String,
      default: "",
    },
    RememberMe: {
      type: Boolean,
      default: false,
    },
  })
);

exports.Users = Users;
exports.RegisterSchema = RegisterSchema;
exports.LoginSchema = LoginSchema;
