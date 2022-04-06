const { Thought, User } = require("../models");

const thoughtController = {
  // Create thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought exists with this Id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({ path: "thought", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reaction",
        select: "__v",
      })
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought exists with this Id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought deleted." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reaction: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No Thought exists with this Id." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // addReaction({ params, body }, res) {
  //   Reaction.create(body)
  //     .then(({ _id }) => {
  //       return Thought.findOneAndUpdate(
  //         { _id: params.id },
  //         { $push: { reaction: params.reactionId } },
  //         { new: true }
  //       );
  //     })
  //     .populate({ path: "reaction", select: "-__v" })
  //     .select("-__v")
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         res.status(404).json({ message: "No Thought exists with this Id." });
  //         return;
  //       }
  //       res.json(dbThoughtData);
  //     })
  //     .catch((err) => res.json(err));
  // },

  // Delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
