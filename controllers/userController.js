const { User, Thought } = require("../models");

module.exports = {
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
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
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ id: req.params.userID })
        .select('-__v').lean();
      if (!userData) {
        
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // res.json({
      //   userData, 
      //   thoughts: await thoughts(req.params.userId),
      // });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userID });

      if (!userData) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json({ message: 'User and all Thought(s) deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userID}, 
        { $set: req.body },
        {runValidators: true, new: true }
      );
      if(!userData){
        res.status(404).json({message: 'No user with this ID!'});
      }
      res.json(userData);
  } catch(err){
    res.status(500).json(err);
  }
},
};
