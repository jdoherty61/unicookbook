//POSTS ... AKA RECIPES.
//Required packages from package.json to be imported to create functional router API calls to MongoDB.
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

//Using package multer to store incoming files - https://www.youtube.com/watch?v=srPXMt1Q0nY&list=LL&index=1&ab_channel=Academind
const multer = require('multer');

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/

// **** Youtube tutorial that enabled me to implement form-data POST to provide upload image ability *****
// https://www.youtube.com/watch?v=srPXMt1Q0nY&list=LL&index=1&ab_channel=Academind

// -------------------------------------------------------------------------------------------------------------

//storage 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {   //cb == callback
      cb(null, './uploads/');         
  },
  filename: function(req, file, cb) {
    //https://github.com/expressjs/multer/issues/513 - had to do a replace because windows users are different!
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)  //adding a date to the image so it stops images from saving over the top of each other.
  }
});

//Only allowing png, jpeg, jpg files to be uploaded temporarily. Could change this in the future to allow multi-media such as videos etc.
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true)
  } else {
      //reject the file
    cb(null, false)
  }
};

const upload = multer({ 
  storage: storage, 
  limits: {
  fileSize: 1024 * 1024 * 5 //5MG
  },
  fileFilter: fileFilter });


//Pulling in the models which will be used in the posts APIs - Mongoose Validation (Stated in disseration, seen in System Architecture Model of Chapter 2)
const Post = require("../../models/Post");
const User = require("../../models/User");
// const UserPreferences = require("../../models/UserPreferences");

//URLS consts
const postUrl = "/";
const postByIdUrl = "/:id";
const postLikeUrl = "/like/:id";
const postUnlikePostUrl = "/unlike/:id"; 
const commentOnPostUrl = "/comment/:id";
const deleteCommentPostUrl = "/comment/:id/:comment_id";
// const userPref = "/userPrefSearchFilter";

//#############################TODO LIST for next iteration ######################################
//Add api to link to other students profile by their id - so users can see each other profiles. 
//Conenct the like, unlike of posts to the front end with the currently created APIs. 
//Connect comment APIs to front end for post.

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  postUrl,
  auth,
  upload.single('image'), //one file only
  async (req, res) => {
  try {

    // console.log(req.file); //console logging for white box testing purposes. 
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      ownerName: user.name,
      ownerAvatar: user.avatar,
      ownerUni: user.university,
      user: req.user.id,
      title: req.body.title,
      image: req.file.path, //MongoDB will store the file name, the folder 'uploads' in this parent directory will store the image.
      totalPrice: req.body.totalPrice,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      effortTime: req.body.effortTime,
      chosenDifficulty: req.body.chosenDifficulty,
      meal: req.body.meal,
      public: req.body.public,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts
// @desc     GET ALL post
// @access   Private - users have to be logged in to see the posts.
router.get(postUrl, auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // the most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/me
// @desc     GET users posts - for profile page
// @access   Private - users have to be logged in to see the posts.
router.get('/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user.id
    }).sort({ date: -1 }); // the most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET api/posts/:id
// @desc     GET post by id
// @access   Private - users have to be logged in to see the posts.
router.get(
  postByIdUrl,
  auth,
  async (req, res) => {

    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);

      if (err.kind === "ObjectId") {
        //Meaning its not a formatted object id ... there's not going to be a post.
        return res.status(404).json({ msg: "Post not found" });
      }

      res.status(500).send("Server Error");
    }

});

// @route    DELETE api/posts/:id
// @desc     DELETE a post
// @access   Private - users have to be logged in to see the posts.
router.delete(
  postByIdUrl,
  auth,
  async (req, res) => {

    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // check user that belongs to that post - don't let users who arent of that post delete it
      if (post.user.toString() !== req.user.id) {
        return res.statusMessage(401).json({ msg: "User Not Authorised" }); //not authorised
      }

      await post.remove();

      res.json({ msg: "Post has been removed" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        //Meaning its not a formatted object id ... theres not going to be a post
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }

});

// @route    PUT api/posts/like/:id
// @desc     like a post
// @access   Private
router.put(
  postLikeUrl, 
  auth, 
  async (req, res) => {

    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked by the user - prevents infinite

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
      ) {
        return res.status(400).json({ msg: "Recipe already liked" });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes); //returning the likes for the front end
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

});

// @route    PUT api/posts/unlike/:id
// @desc     unlike a post
// @access   Private
router.put(
  postUnlikePostUrl, 
  auth, 
  async (req, res) => {

    try {
      
      //todo: could i put this in the above? prevent two apis and just have one?
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked by the user - prevents infinites

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ msg: "Recipe has not been liked yet to unlike." });
      }

      //Get the remove index
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      res.json(post.likes); //returning the likes for the front end
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

});

// @route    POST api/posts/comment/:id
// @desc     comment on a post
// @access   Private
router.post(
  commentOnPostUrl,
  auth,
  [check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments); //sending back all the comments for the front end.
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     delete a comment on a post
// @access   Private
router.delete(
  deleteCommentPostUrl,
  auth, 
  async (req, res) => {
    
    try {
      const post = await Post.findById(req.params.id);

      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );

      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

});



module.exports = router;
