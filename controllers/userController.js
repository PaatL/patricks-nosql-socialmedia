const { User } = require("../models");

module.exports = {
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getAllUsers(req, res) {
    try {
        const userData = await User.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
  },
};
