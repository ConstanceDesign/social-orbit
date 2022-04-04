const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// GET all and POST at /api/user
router.route("/").get(getAllUser).post(createUser);

// GET one, PUT, and DELETE at /api/user/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// POST, and DELETE at user/userId/:friendId
router.route("/:id/friend/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
