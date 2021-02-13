const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
// const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  async (req, res) => {


    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        ownerName: user.name,
        ownerAvatar: user.avatar,
        ownerUni: user.university,
        user: req.user.id,
        title: req.body.title,
        //needs to be changed when implementing front end etc - video
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        effortTime: req.body.effortTime,
        chosenDifficulty: req.body.chosenDifficulty,
        meal: req.body.meal,
        public: req.body.public
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);



// @route    GET api/posts
// @desc     GET ALL post
// @access   Private - users have to be logged in to see the posts.
router.get('/', auth, async (req, res) => {
    try{

        const posts = await Post.find().sort({ date: -1 }) // the most recent 
        res.json(posts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @route    GET api/posts/:id
// @desc     GET post by id
// @access   Private - users have to be logged in to see the posts.
router.get('/:id', auth, async (req, res) => {
    try{

        const post = await Post.findById(req.params.id) 

        if(!post) {
            return res.status(404).json({ msg: 'Post not found'});
        }

        res.json(post);

    } catch (err) {
        console.error(err.message);
        
        if(err.kind === 'ObjectId') {  //Meaning its not a formatted object id ... theres not going to be a post 
            return res.status(404).json({ msg: 'Post not found'});
        }

        res.status(500).send('Server Error');
    }

});


// @route    DELETE api/posts/:id
// @desc     DELETE a post 
// @access   Private - users have to be logged in to see the posts.
router.delete('/:id', auth, async (req, res) => {
    try{

        const post = await Post.findById(req.params.id);

        if(!post) {   
            return res.status(404).json({ msg: 'Post not found'});
        }

        // check user that belongs to that post - dont let users who arent of that post delete it
        if(post.user.toString() !== req.user.id){
            return res.statusMessage(401).json({ msg: 'User Not Authorised'}); //not authorised
        }

        await post.remove();

        res.json({ msg: 'Post has been removed'});

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {  //Meaning its not a formatted object id ... theres not going to be a post 
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }

});




module.exports = router;