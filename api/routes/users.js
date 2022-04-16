const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// all user operations ,, CRUD here

//update user
router.put("/:id", async (req, res) => {
  //if (req.body.userId === req.params.id || req.body.isAdmin) { // check if user is allowed to update account
    if (req.body.password) {
      try { // update password and reencrypt
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try { // find the user and update
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("Account has been updated!");
    } catch (err) {
      return res.status(500).json(err);
    }
 /* } else { // user does not have access
    return res.status(403).json("Access Restricted!");
  }*/
});

//delete user
router.delete("/:id", async (req, res) => { // check if user is allowed to update account
  //if (req.body.userId === req.params.id || req.body.isAdmin) {
    try { // find the user and delete
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  //} else { // user does not have access
   // return res.status(403).json("Access Restricted!");
  //}
});

//get a user
/*
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(500).json("user does not exist!");
    }else{
      const { password, updatedAt, ...other } = user._doc;  // other is all fields but password and updatedAt
      return res.status(200).json(other);
    }
   
  } catch (err) {
    //return res.status(500).json(err);
    return res.status(500).json("user does not exist!"); // this should not be how this code works yo!
  }
});
*/
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) { // can't follow yourself
    try {
      const user = await User.findById(req.params.id); // user you want to follow --> localhost: contains who you want to follow
      const currentUser = await User.findById(req.body.userId); // yourself
      if (!user.followers.includes(req.body.userId)) { // user must be someone you don't already follow
        await user.updateOne({ $push: { followers: req.body.userId } }); // update other user's followers array
        await currentUser.updateOne({ $push: { followings: req.params.id } }); // update your following array
        return res.status(200).json("User has been followed!");
      } else {
        return res.status(403).json("You already follow this user!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't follow yourself silly!");
  }
});

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) { // can't unfollow yourself
      try {
        const user = await User.findById(req.params.id); // user you want to unfollow  --> localhost: contains who you want to unfollow
        const currentUser = await User.findById(req.body.userId); // yourself
        if (user.followers.includes(req.body.userId)) { // user must be someone you follow
          await user.updateOne({ $pull: { followers: req.body.userId } }); // remove from other user's followers array
          await currentUser.updateOne({ $pull: { followings: req.params.id } }); // remove from your following array
          return res.status(200).json("User has been unfollowed!");
        } else {
          return res.status(403).json("You dont follow this user!");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can't unfollow yourself silly!");
    }
  });

module.exports = router;