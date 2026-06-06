const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create post
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!text && !image) return res.status(400).json({ msg: 'Post needs text or image' });

  try {
    const post = new Post({ username: req.user.username, text, image });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Like / Unlike
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const username = req.user.username;

    if (post.likes.includes(username)) {
      post.likes = post.likes.filter(u => u !== username);
    } else {
      post.likes.push(username);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Comment
router.post('/:id/comment', auth, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ msg: 'Comment cannot be empty' });

  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ username: req.user.username, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;