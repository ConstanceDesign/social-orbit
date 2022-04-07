const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Reaction Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reaction: {
      type: String,
      required: true,
      maxLength: 280,
    },
    friend: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    strict: false,
    strictPopulate: false,
  }
);

module.exports = reactionSchema;
