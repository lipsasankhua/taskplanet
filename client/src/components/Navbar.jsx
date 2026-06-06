import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-brand">
        🌍 TaskPlanet
      </div>
      {username && (
        <div className="navbar-right">
          <span className="navbar-username">@{username}</span>
          <div className="nav-avatar">{username[0].toUpperCase()}</div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;