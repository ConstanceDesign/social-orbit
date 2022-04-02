const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: [
    {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
  ],
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

reactionSchema.virtual("ObjectId").get(() => {
  return this._id;
});

module.exports = Reaction;
