import React, { useState } from 'react';
import axios from 'axios';

function PostCard({ post, onUpdate }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const liked = post.likes.includes(username);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: token } }
      );
      onUpdate(res.data);
    } catch {
      alert('Please login to like');
    }
  };

  const handleComment = async e => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/comment`,
        { text: comment },
        { headers: { Authorization: token } }
      );
      onUpdate(res.data);
      setComment('');
      setShowComments(true);
    } catch {
      alert('Please login to comment');
    }
  };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="avatar">{post.username[0].toUpperCase()}</div>
        <div>
          <div className="post-username">@{post.username}</div>
          <div className="post-time">{timeAgo(post.createdAt)}</div>
        </div>
      </div>

      {post.text && <p className="post-text">{post.text}</p>}

      {post.image && (
        <img
          className="post-image"
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="post"
        />
      )}

      <div className="post-stats">
        <span>👍 {post.likes.length} likes</span>
        <span>💬 {post.comments.length} comments</span>
      </div>

      <div className="post-actions">
        <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? '👍 Liked' : '👍 Like'}
        </button>
        <button className="comment-action-btn" onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          {post.comments.map((c, i) => (
            <div className="comment-item" key={i}>
              <div className="comment-avatar">{c.username[0].toUpperCase()}</div>
              <div className="comment-bubble">
                <strong>@{c.username} </strong>{c.text}
              </div>
            </div>
          ))}

          <form className="comment-input-row" onSubmit={handleComment}>
            <div className="comment-avatar">{username?.[0]?.toUpperCase()}</div>
            <input
              className="comment-input"
              placeholder="Write a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button className="comment-send-btn" type="submit">➤</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostCard;