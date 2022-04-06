const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("../models/Reaction");

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    strict: false,
    strictPopulate: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length || "No reaction found.";
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
