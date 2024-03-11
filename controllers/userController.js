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
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v').populate('thoughts').populate('friends')
      if (!userData) {
        
        return res.status(400).json({ message: 'No user with that ID' });
      }

      res.json(userData)
;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }   
  },
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        res.status(400 ).json({ message: 'No user with that ID' });
      }
      // await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json({ message: 'User deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId}, 
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


// friend interactions

async addFriend(req,res) {
  try {
    const friendData = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$push: {friends: req.params.friendId}},
      {runValidators: true, new: true}
    );
    if(!friendData){
      res.status(400).json({message: 'No user with this ID!'});
    }
    res.json(friendData);
  } catch (error) {
    res.status(500).json(error);
  }
},
async deleteFriend(req,res) {
  try {
    const friendData = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends: req.params.friendId}},
      {runValidators: true, new: true}
    );
    if(!friendData){
      res.status(400).json({message: 'No user with this ID!'});
    }
    res.json(friendData);
  } catch (error) {
    res.status(500).json(error);
  }
}
};
