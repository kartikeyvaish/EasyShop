const mongoose = require("mongoose");
const Joi = require("joi");
const DateTime = require("../config/TimeFunctions.ts");

const MessageSchema = {
  From: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  Message: {
    type: String,
    default: "",
  },
  Time: {
    type: String,
    default: "",
  },
  Date: {
    type: String,
    default: "",
  },
  Type: {
    type: String,
    default: "Text",
  },
  File: {
    type: String,
    default: "",
  },
  PreviewFile: {
    type: String,
    default: "",
  },
  Mime: {
    type: String,
    default: "",
  },
  DateOBJ: { type: String, default: DateTime.GetDateOBJ() },
  Read: { type: Boolean, default: false },
};

const Chats = mongoose.model(
  "Chats",
  new mongoose.Schema({
    Users: {
      type: Array,
      required: true,
      default: [],
    },
    LastMessage: {
      type: String,
      default: "",
    },
    LastMessageDate: {
      type: String,
      default: "",
    },
    LastMessageType: {
      type: String,
      default: "Text",
    },
    Participants: {
      type: Array,
      default: [],
    },
    Messages: {
      type: [MessageSchema],
      default: [],
    },
  })
);

exports.Chats = Chats;
exports.MessageSchema = MessageSchema;
