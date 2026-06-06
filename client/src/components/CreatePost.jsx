import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPost }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');

  const handleImage = e => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text && !image) return;

    const formData = new FormData();
    if (text) formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post('https://taskplanet-server-td9i.onrender.com/api/posts', formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });
      onPost(res.data);
      setText('');
      setImage(null);
      setPreview(null);
    } catch (err) {
      alert(err.response?.data?.msg || 'Post failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-card">
      <div className="create-post-top">
        <div className="avatar">{username?.[0]?.toUpperCase()}</div>
        <textarea
          className="create-post-textarea"
          rows={2}
          placeholder="What's on your mind?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="preview" />
          <button className="remove-image" onClick={removeImage}>✕</button>
        </div>
      )}

      <div className="create-post-actions">
        <label className="image-label">
          📷 Photo
          <input type="file" accept="image/*" onChange={handleImage} />
        </label>
        <button className="post-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;