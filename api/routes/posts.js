const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  console.log(newPost);
  const topicName = await User.find({username: req.body.topic});

  
  if(!req.body.topic){
    topicName[0] = "";
  }
  
  //console.log(String(topicName[0]._id));
  const newPost1 = {
    userId: req.body.userId,
    topic: String(topicName[0]._id),
    desc: req.body.desc,
    img: req.body.img,
    likes: req.body.likes
  };

  const newPost1Obj = new Post(newPost1)
  console.log(newPost1Obj)
  try {
    const savedPost = await newPost1Obj.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    //const topic = await currentUser.findById("625de278b555fba6614a3ac1");
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );


    const topicPosts = await Promise.all(
        currentUser.topicsFollowed.map((topicId) => {

          const post = Post.find({ topic: topicId});
            return post;
          
       
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts).concat(...topicPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    const topicPosts = await Post.find({topic: user._id});
    res.status(200).json(posts.concat(...topicPosts));
  } catch (err) {
    res.status(500).json("error in posts.js (routes)");
  }
});

module.exports = router;
