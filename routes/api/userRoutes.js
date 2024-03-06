const router = require("express").Router();
const { createUser, getAllUsers, getSingleUser, deleteUser, updateUser } = require("../../controllers/userController");

//localhost:3001/api/user
router.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;
