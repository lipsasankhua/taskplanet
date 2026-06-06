import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

function Feed({ newPost }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('https://taskplanet-server-td9i.onrender.com/api/posts');
    setPosts(res.data);
  };

  useEffect(() => { fetchPosts(); }, [newPost]);

  const updatePost = (updated) => {
    setPosts(posts.map(p => p._id === updated._id ? updated : p));
  };

  if (posts.length === 0) return (
    <div className="empty-feed">
      <div style={{ fontSize: '40px' }}>🌍</div>
      <p>No posts yet. Be the first to post!</p>
    </div>
  );

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post._id} post={post} onUpdate={updatePost} />
      ))}
    </div>
  );
}

export default Feed;