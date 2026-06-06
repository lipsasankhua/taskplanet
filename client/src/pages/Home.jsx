import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';

function Home() {
  const [newPost, setNewPost] = useState(null);
  const username = localStorage.getItem('username');

  return (
    <div className="page-wrapper">

      {/* Left - Task Images */}
      <div className="middle-column">
        <div className="task-image-card">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80" alt="Sales Task" />
          <div className="task-image-label">Sales Task</div>
        </div>
        <div className="task-image-card">
          <img src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&q=80" alt="Marketing Task" />
          <div className="task-image-label">Marketing Task</div>
        </div>
        <div className="task-image-card">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" alt="Referral Task" />
          <div className="task-image-label">Referral Task</div>
        </div>
      </div>

      {/* Middle - Feed */}
      <div className="main-feed">
        <CreatePost onPost={setNewPost} />
        <div className="feed-header">Recent Posts</div>
        <Feed newPost={newPost} />
      </div>

      {/* Right - Sidebar */}
      <div className="right-sidebar">
        <div className="profile-card">
          <div className="profile-banner" />
          <div className="profile-info">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">{username?.[0]?.toUpperCase()}</div>
            </div>
            <div className="profile-name">{username}</div>
            <div className="profile-handle">@{username}</div>
            <div className="profile-divider" />
            <div className="profile-stat">
              <span>Member since</span>
              <span>Today</span>
            </div>
            <div className="profile-stat">
              <span>Status</span>
              <span>🟢 Active</span>
            </div>
          </div>
        </div>

        <div className="sidebar-card orange-card">
          <div className="sidebar-title">💡 Tips</div>
          <div className="tip-item">
            <span className="tip-icon">📸</span>
            <span>Add images to get more likes</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">💬</span>
            <span>Comment to engage with community</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🔥</span>
            <span>Post daily to stay active</span>
          </div>
        </div>

        <div className="sidebar-card purple-card">
          <div className="sidebar-title">🚀 Task Categories</div>
          <div className="task-cat-item">
            <span>📱</span>
            <div>
              <div className="task-cat-name">Social Task</div>
              <div className="task-cat-sub">Share & engage</div>
            </div>
          </div>
          <div className="task-cat-item">
            <span>📣</span>
            <div>
              <div className="task-cat-name">Marketing Task</div>
              <div className="task-cat-sub">Promote & earn</div>
            </div>
          </div>
          <div className="task-cat-item">
            <span>🤝</span>
            <div>
              <div className="task-cat-name">Referral Task</div>
              <div className="task-cat-sub">Invite & reward</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;