const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

// // Reaction Schema
// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reaction: {
//       type: String,
//       required: true,
//       maxLength: 280,
//     },
//     friend: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => dateFormat(createdAtVal),
//     },
//   },
//   {
//     toJSON: {
//       virtuals: true,
//       getters: true,
//     },
//     id: false,
//     strict: false,
//     strictPopulate: false,
//   }
// );

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
