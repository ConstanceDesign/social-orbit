const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought).post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// POST at /api/thought/user/:id
// router.route("/:userId").post(createThought);

// POST at /api/thought/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(addReaction);

// DELETE at /:thoughtId/reaction/reactionId
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
