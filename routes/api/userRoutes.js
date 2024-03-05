const router = require("express").Router();
const { createUser, getAllUsers } = require("../../controllers/userController");

//localhost:3001/api/users
router.route('/')

module.exports = router;
