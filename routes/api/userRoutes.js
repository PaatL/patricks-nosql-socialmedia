const router = require("express").Router();
const { createUser, getAllUsers, getSingleUser, deleteUser, updateUser,addFriend, deleteFriend } = require("../../controllers/userController");

//localhost:3001/api/user
router.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
