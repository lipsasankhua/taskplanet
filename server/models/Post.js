const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: String,
  text: String
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String },
  image: { type: String },
  likes: { type: [String], default: [] },
  comments: { type: [commentSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);