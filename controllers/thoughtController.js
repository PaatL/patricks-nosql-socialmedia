const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thoughtData) {
        res.status(400).json({ message: "Thought doesn't exist!" });
      }
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const userData = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        res.status(400).json({ message: "User not found." });
      }

      //create a variable for user(username),
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $set: req.body, //built in mongoose operator
        },
        { runValidators: true, new: true } // shows data after the update takes place
      );

      if (!thoughtData) {
        res.status(400).json({ message: "Thought not found" });
      }
      res.status(200).json({ message: "Thought updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        res.status(400).json({ message: "Thought not found" });
      }
      res.status(200).json({ message: "Thought Deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //reaction interaction

  async addReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!reactionData) {
        res.status(400).json({ message: "Thought not found" });
      }
      res.status(200).json({ message: "Reaction added" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
